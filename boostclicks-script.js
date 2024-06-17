const style = document.createElement('style');
style.textContent = `
.iti__flag-container {
    display: none;
}
`;
document.head.append(style);

const scriptJQuery = document.createElement('script');
scriptJQuery.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js";
scriptJQuery.integrity = "sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==";
scriptJQuery.crossOrigin = "anonymous";
scriptJQuery.referrerPolicy = "no-referrer";
document.head.append(scriptJQuery);

document.addEventListener('DOMContentLoaded', () => {
    var phones = document.querySelectorAll('input[name=phone]');
    phones.forEach(phone => {
        processInput(phone);
    });
});

function processInput(phone) {
    var iti = window.intlTelInput(phone, {
        allowDropdown: true,
        initialCountry: '{country_code}',
        nationalMode: true,
        autoPlaceholder: 'aggressive',
        formatOnDisplay: true,
        separateDialCode: true,
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/19.2.16/js/utils.js'
    });

    updateDialCode(phone, iti.getSelectedCountryData().dialCode);

    phone.addEventListener('input', () => {
        phone.setCustomValidity('');
        if (!iti.isValidNumber()) {
            phone.setCustomValidity('Invalid phone number format.');
        }
    });

    phone.addEventListener('countrychange', function () {
        updateDialCode(phone, iti.getSelectedCountryData().dialCode);
    });

    phone.addEventListener('focus', function () {
        if (!phone.value.trim()) {
            updateDialCode(phone, iti.getSelectedCountryData().dialCode);
        }
    });
}

function updateDialCode(phone, dialCode) {
    phone.value = `+${dialCode} `;
}

scriptJQuery.onload = function () {
    const scriptIntlTelInput = document.createElement('script');
    scriptIntlTelInput.src = "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js";
    document.head.append(scriptIntlTelInput);
};

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const now = Date.now();
        const requestLogs = JSON.parse(localStorage.getItem('requestLogs')) || [];

        const filteredLogs = requestLogs.filter(log => (now - log.timestamp) < 24 * 60 * 60 * 1000);

        if (filteredLogs.length >= 2) {
            window.location.href = 'error.php';
        } else {
            filteredLogs.push({ timestamp: now });
            localStorage.setItem('requestLogs', JSON.stringify(filteredLogs));
            form.submit();
        }
    });
});

document.oncontextmenu = cmenu; function cmenu() { return false; };