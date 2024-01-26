import validator from "validator";
import parsePhoneNumber from "libphonenumber-js";
export const validatePatientData = (data) => {
    const errors = {
    };
    const checkName = validName(data.name);
    const checkAdress = validAddress(data.address);
    const checkEmail = validEmail(data.email);
    const checkPhone = validatePhoneNumberWithCountryCode(data.phone);
    const checkPassword = validPassword(data.password);
    const checkImage = validImage(data.image);

    if (checkAdress) {
        errors["address"] = checkAdress;
    }
    if (checkEmail) {
        errors["email"] = checkEmail;
    }
    if (checkPhone) {
        errors["phone"] = checkPhone;
    }
    if (checkPassword) {
        errors["password"] = checkPassword;
    }
    if (checkImage) {
        errors["image"] = checkImage;
    }
    if (checkName) {
        errors["name"] = checkName;
    }
    if (data.psychiatristId === undefined || data.psychiatristId === '') {
        errors["psychiatristId"] = "user is not valid";
    }
    return Object.keys(errors).length === 0 ? null : errors;
};
export const validatePsychiatristData = (data) => {
    const errors = {
    };
    const checkName = validName(data.name);
    const checkEmail = validEmail(data.email);
    const checkPhone = validatePhoneNumberWithCountryCode(data.phone);
    const checkPassword = validPassword(data.password);
    if (checkEmail) {
        errors["email"] = checkEmail;
    }
    if (checkPhone) {
        errors["phone"] = checkPhone;
    }
    if (checkPassword) {
        errors["password"] = checkPassword;
    }
    if (checkName) {
        errors["name"] = checkName;
    }
    if (data.hospitalId === undefined || data.hospitalId === null) {
        errors["hospitalId"] = "hospitalId is Required";
    }
    return Object.keys(errors).length === 0 ? null : errors;
};
export const validateHospitalData = (data) => {
    const errors = {
    };
    const checkName = validName(data.name);
    const checkLocation = validLocation(data.location);
    if (checkLocation) {
        errors["location"] = checkLocation;
    }
    if (checkName) {
        errors["name"] = checkName;
    }
    return Object.keys(errors).length === 0 ? null : errors;
};
export function validName(name) {
    if (name === undefined || !validator.isLength(name, { min: 1 })) {
        return 'Name is required.';
    }
    return null;
}
export function validLocation(location) {
    if (location === undefined || !validator.isLength(location, { min: 1 })) {
        return 'location is required.';
    }
    return null;
}
export function validAddress(address) {
    if (address === undefined || !validator.isLength(address, { min: 10 })) {
        return 'Address should be at least 10 characters.';
    }
    return null;
}
export function validEmail(email) {
    if (email === undefined || !validator.isEmail(email)) {
        return 'Invalid email address.';
    }
    return null;
}
export function validImage(image) {
    if (image === undefined || image === false) {
        return "Image should be uploaded"
    } else if ((image.size / 1024) > 700) {
        return "Image size should not exceed 700kb"
    }
    return null;
}
export function validPassword(password) {
    if (password === undefined || !/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase character.';
    }

    else if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase character.';
    }
    else if (!/\d/.test(password)) {
        return 'Password must contain at least one number.';
    }

    else if (!validator.isLength(password, { min: 8 })) {
        return 'Password should be at least 8 characters.';
    }

    else if (!validator.isLength(password, { max: 15 })) {
        return 'Password length should not exceed 15 characters.';
    }
    return null;
}
export function validatePhoneNumberWithCountryCode(phoneNumber) {
    try {
        const parsedNumber = parsePhoneNumber(phoneNumber);
        if (parsedNumber && parsedNumber.isValid()) {
            return null;
        } else {
            return 'Invalid phone number.';
        }
    } catch (error) {
        return 'Invalid phone number.';
    }
}

