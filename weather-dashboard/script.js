// Weather Dashboard - Main JavaScript
// Using OpenWeatherMap API

// Configuration
const API_KEY = 'a86297d4a9e8f7f8a5c5c6d5e6e7f8f9'; // Replace with your actual API key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// State
let currentWeather = null;
let currentUnit = localStorage.getItem('tempUnit') || 'metric';
let currentTheme = localStorage.getItem('theme') || 'auto';
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentLocation = { lat: null, lon: null, name: 'الموقع الحالي' };

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const currentLocationBtn = document.getElementById('currentLocationBtn');
const favoritesBtn = document.getElementById('favoritesBtn');
const weatherContent = document.getElementById('weatherContent');
const loadingSpinner = document.getElementById('loadingSpinner');
const suggestions = document.getElementById('suggestions');
const favoritesModal = document.getElementById('favoritesModal');
const closeModal = document.getElementById('closeModal');
const unitToggle = document.getElementById('unitToggle');
const themeToggle = document.getElementById('themeToggle');
const languageToggle = document.getElementById('languageToggle');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    unitToggle.value = currentUnit;
    themeToggle.value = currentTheme;
    
    setupEventListeners();
    getDefaultWeather();
});

// Event Listeners
function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    cityInput.addEventListener('input', handleCityInput);
    currentLocationBtn.addEventListener('click', getCurrentLocation);
    favoritesBtn.addEventListener('click', showFavorites);
    closeModal.addEventListener('click', closeFavoritesModal);
    unitToggle.addEventListener('change', handleUnitChange);
    themeToggle.addEventListener('change', handleThemeChange);
    languageToggle.addEventListener('change', handleLanguageChange);
    favoritesModal.addEventListener('click', (e) => {
        if (e.target === favoritesModal) closeFavoritesModal();
    });
}

// Get Default Weather (Current Location or Major City)
async function getDefaultWeather() {
    try {
        showLoadingSpinner();
        // Try to get current location first
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    currentLocation.lat = position.coords.latitude;
                    currentLocation.lon = position.coords.longitude;
                    fetchWeatherByCoordinates();
                },
                () => {
                    // If geolocation fails, use default city
                    fetchWeatherByCity('الرياض');
                }
            );
        } else {
            fetchWeatherByCity('الرياض');
        }
    } catch (error) {
        console.error('Error getting default weather:', error);
        showError('حدث خطأ في تحميل بيانات الطقس');
    }
}

// Handle Search
async function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) {
        alert('يرجى إدخال اسم المدينة');
        return;
    }
    fetchWeatherByCity(city);
    suggestions.classList.remove('active');
}

// Handle City Input (Suggestions)
let debounceTimer;
function handleCityInput(e) {
    clearTimeout(debounceTimer);
    const value = e.target.value.trim();
    
    if (value.length < 2) {
        suggestions.classList.remove('active');
        return;
    }
    
    debounceTimer = setTimeout(() => {
        getSuggestions(value);
    }, 300);
}

// Get City Suggestions
async function getSuggestions(query) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/find?q=${query}&type=like&sort=population&cnt=10&appid=${API_KEY}`
        );
        const data = await response.json();
        
        if (data.list && data.list.length > 0) {
            const suggestionsHtml = data.list
                .map(city => `
                    <div class="suggestion-item" onclick="fetchWeatherByCity('${city.name}')">
                        ${city.name}, ${city.sys.country}
                    </div>
                `)
                .join('');
            
            suggestions.innerHTML = suggestionsHtml;
            suggestions.classList.add('active');
        }
    } catch (error) {
        console.error('Error getting suggestions:', error);
    }
}

// Fetch Weather by City
async function fetchWeatherByCity(city) {
    try {
        showLoadingSpinner();
        
        const weatherResponse = await fetch(
            `${API_BASE_URL}/weather?q=${city}&units=${currentUnit}&lang=ar&appid=${API_KEY}`
        );
        
        if (!weatherResponse.ok) {
            throw new Error('المدينة غير موجودة');
        }
        
        const weatherData = await weatherResponse.json();
        currentLocation = {
            lat: weatherData.coord.lat,
            lon: weatherData.coord.lon,
            name: `${weatherData.name}, ${weatherData.sys.country}`
        };
        
        currentWeather = weatherData;
        cityInput.value = weatherData.name;
        
        // Fetch forecast and UV data
        await Promise.all([
            fetchForecast(),
            fetchHourlyForecast(),
            fetchUVIndex()
        ]);
        
        displayWeather();
    } catch (error) {
        console.error('Error fetching weather:', error);
        showError(error.message || 'حدث خطأ في تحميل البيانات');
    }
}

// Fetch Weather by Coordinates
async function fetchWeatherByCoordinates() {
    try {
        showLoadingSpinner();
        
        const weatherResponse = await fetch(
            `${API_BASE_URL}/weather?lat=${currentLocation.lat}&lon=${currentLocation.lon}&units=${currentUnit}&lang=ar&appid=${API_KEY}`
        );
        
        const weatherData = await weatherResponse.json();
        currentWeather = weatherData;
        currentLocation.name = `${weatherData.name}, ${weatherData.sys.country}`;
        cityInput.value = weatherData.name;
        
        // Fetch forecast and UV data
        await Promise.all([
            fetchForecast(),
            fetchHourlyForecast(),
            fetchUVIndex()
        ]);
        
        displayWeather();
    } catch (error) {
        console.error('Error fetching weather by coordinates:', error);
        showError('حدث خطأ في تحميل بيانات الموقع');
    }
}

// Get Current Location
function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert('متصفحك لا يدعم خدمة تحديد الموقع');
        return;
    }
    
    showLoadingSpinner();
    navigator.geolocation.getCurrentPosition(
        (position) => {
            currentLocation.lat = position.coords.latitude;
            currentLocation.lon = position.coords.longitude;
            fetchWeatherByCoordinates();
        },
        (error) => {
            console.error('Error getting location:', error);
            showError('تعذر الحصول على موقعك');
            hideLoadingSpinner();
        }
    );
}

// Fetch 5-Day Forecast
async function fetchForecast() {
    try {
        const response = await fetch(
            `${API_BASE_URL}/forecast?lat=${currentLocation.lat}&lon=${currentLocation.lon}&units=${currentUnit}&lang=ar&cnt=40&appid=${API_KEY}`
        );
        const data = await response.json();
        displayForecast(data.list);
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

// Fetch Hourly Forecast
async function fetchHourlyForecast() {
    try {
        const response = await fetch(
            `${API_BASE_URL}/forecast?lat=${currentLocation.lat}&lon=${currentLocation.lon}&units=${currentUnit}&lang=ar&cnt=8&appid=${API_KEY}`
        );
        const data = await response.json();
        displayHourlyForecast(data.list);
    } catch (error) {
        console.error('Error fetching hourly forecast:', error);
    }
}

// Fetch UV Index
async function fetchUVIndex() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/uvi?lat=${currentLocation.lat}&lon=${currentLocation.lon}&appid=${API_KEY}`
        );
        const data = await response.json();
        document.getElementById('uvIndex').textContent = data.value.toFixed(1);
    } catch (error) {
        console.error('Error fetching UV index:', error);
    }
}

// Display Current Weather
function displayWeather() {
    const weather = currentWeather;
    const unit = currentUnit === 'metric' ? '°C' : '°F';
    
    // Update header
    document.getElementById('cityName').textContent = `${weather.name}, ${weather.sys.country}`;
    document.getElementById('lastUpdate').textContent = `آخر تحديث: ${new Date().toLocaleTimeString('ar-SA')}`;
    
    // Update main weather
    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
    document.getElementById('weatherIcon').src = iconUrl;
    document.getElementById('temp').textContent = `${Math.round(weather.main.temp)}${unit}`;
    document.getElementById('feelsLike').textContent = `يشعر بـ ${Math.round(weather.main.feels_like)}${unit}`;
    document.getElementById('description').textContent = weather.weather[0].description;
    
    // Update details
    document.getElementById('humidity').textContent = `${weather.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${weather.wind.speed} م/ث`;
    document.getElementById('pressure').textContent = `${weather.main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${(weather.visibility / 1000).toFixed(1)} كم`;
    document.getElementById('windGust').textContent = `${weather.wind.gust || 'N/A'} م/ث`;
    
    // Update additional info
    document.getElementById('feelsLikeInfo').textContent = `${Math.round(weather.main.feels_like)}${unit}`;
    document.getElementById('cloudiness').textContent = `${weather.clouds.all}%`;
    document.getElementById('rainfall').textContent = `${(weather.rain ? weather.rain['1h'] : 0) * 100}%`;
    document.getElementById('rainAmount').textContent = `${weather.rain ? weather.rain['1h'].toFixed(2) : '0.00'} مم`;
    
    // Update sun times
    document.getElementById('sunrise').textContent = new Date(weather.sys.sunrise * 1000).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('sunset').textContent = new Date(weather.sys.sunset * 1000).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    
    // Update favorite button
    const favoriteBtn = document.getElementById('favoriteBtn');
    const isFavorite = favorites.some(fav => fav.name === weather.name);
    if (isFavorite) {
        favoriteBtn.classList.add('active');
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
        favoriteBtn.classList.remove('active');
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
    }
    
    favoriteBtn.addEventListener('click', () => toggleFavorite(weather.name));
    
    hideLoadingSpinner();
    weatherContent.style.display = 'block';
}

// Display Hourly Forecast
function displayHourlyForecast(hourlyData) {
    const hourlyContainer = document.getElementById('hourlyForecast');
    const unit = currentUnit === 'metric' ? '°C' : '°F';
    
    const hourlyHtml = hourlyData
        .map(item => {
            const time = new Date(item.dt * 1000).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
            const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
            const temp = Math.round(item.main.temp);
            
            return `
                <div class="hourly-item">
                    <p class="hourly-time">${time}</p>
                    <div class="hourly-icon">
                        <img src="${icon}" alt="Weather">
                    </div>
                    <p class="hourly-temp">${temp}${unit}</p>
                </div>
            `;
        })
        .join('');
    
    hourlyContainer.innerHTML = hourlyHtml;
}

// Display 5-Day Forecast
function displayForecast(forecastData) {
    const forecastGrid = document.getElementById('forecastGrid');
    const unit = currentUnit === 'metric' ? '°C' : '°F';
    const dailyData = {};
    
    // Group by day
    forecastData.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString('ar-SA');
        if (!dailyData[date]) {
            dailyData[date] = [];
        }
        dailyData[date].push(item);
    });
    
    // Generate forecast cards
    const forecastHtml = Object.entries(dailyData)
        .slice(0, 5)
        .map(([date, items]) => {
            const temps = items.map(item => item.main.temp);
            const maxTemp = Math.round(Math.max(...temps));
            const minTemp = Math.round(Math.min(...temps));
            const noon = items[items.length - 1];
            const icon = `https://openweathermap.org/img/wn/${noon.weather[0].icon}.png`;
            const day = new Date(noon.dt * 1000).toLocaleDateString('ar-SA', { weekday: 'short' });
            
            return `
                <div class="forecast-card">
                    <p class="forecast-date">${date}</p>
                    <p class="forecast-day">${day}</p>
                    <div class="forecast-icon">
                        <img src="${icon}" alt="Weather">
                    </div>
                    <div class="forecast-temps">
                        <span class="forecast-temp-max">${maxTemp}${unit}</span>
                        <span class="forecast-temp-min">${minTemp}${unit}</span>
                    </div>
                    <p class="forecast-description">${noon.weather[0].description}</p>
                </div>
            `;
        })
        .join('');
    
    forecastGrid.innerHTML = forecastHtml;
}

// Toggle Favorite
function toggleFavorite(cityName) {
    const isFavorite = favorites.some(fav => fav.name === cityName);
    
    if (isFavorite) {
        favorites = favorites.filter(fav => fav.name !== cityName);
    } else {
        favorites.push({
            name: cityName,
            lat: currentLocation.lat,
            lon: currentLocation.lon
        });
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayWeather();
}

// Show Favorites
function showFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="empty-message">لا توجد مدن مفضلة بعد</p>';
    } else {
        favoritesList.innerHTML = favorites
            .map(fav => `
                <div class="favorite-item">
                    <span class="favorite-item-name" onclick="fetchWeatherByCity('${fav.name}')">${fav.name}</span>
                    <button class="favorite-remove" onclick="removeFavorite('${fav.name}')">حذف</button>
                </div>
            `)
            .join('');
    }
    
    favoritesModal.classList.add('active');
}

// Remove Favorite
function removeFavorite(cityName) {
    favorites = favorites.filter(fav => fav.name !== cityName);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    showFavorites();
}

// Close Favorites Modal
function closeFavoritesModal() {
    favoritesModal.classList.remove('active');
}

// Handle Unit Change
function handleUnitChange(e) {
    currentUnit = e.target.value;
    localStorage.setItem('tempUnit', currentUnit);
    if (currentWeather) {
        displayWeather();
        fetchForecast();
        fetchHourlyForecast();
    }
}

// Handle Theme Change
function handleThemeChange(e) {
    currentTheme = e.target.value;
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
}

// Apply Theme
function applyTheme(theme) {
    const body = document.body;
    
    if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
    } else if (theme === 'dark') {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }
}

// Handle Language Change
function handleLanguageChange(e) {
    const language = e.target.value;
    // This would require updating all text strings
    // For now, just log the selection
    console.log('Language changed to:', language);
}

// Show Loading Spinner
function showLoadingSpinner() {
    loadingSpinner.style.display = 'flex';
    weatherContent.style.display = 'none';
}

// Hide Loading Spinner
function hideLoadingSpinner() {
    loadingSpinner.style.display = 'none';
}

// Show Error
function showError(message) {
    hideLoadingSpinner();
    alert(message);
}

// Console Message
console.log('%cWeather Dashboard', 'color: #d4af37; font-size: 20px; font-weight: bold;');
console.log('%cData powered by OpenWeatherMap', 'color: #d4af37; font-size: 12px;');