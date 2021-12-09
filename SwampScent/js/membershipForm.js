// Determines if a field is blank
function isBlank(inputField)
{
    if (inputField.value.length === 0)
    {
        return true;
    }
    return false;
}

// Validates email
function validateEmail()
{
    // Gets email dom element
    var email = document.getElementById("email");

    // Shamelessly copied the regex from the L16 participation XD
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // var filter = /^(.+)@ (.+)$/;

    // Tests filter
    if (!filter.test(email.value) || isBlank(email))
    {
        setErrorBackground(email, true);
        email.focus;
        return false;
    } else
    {
        setErrorBackground(email, false);
        return true;
    }
}

// Validates Phone number
function validatePhone()
{
    // Gets phone dom element
    var phone   = document.getElementById("phone");
    var filter1 = /^\d{3}-\d{3}-\d{4}$/;
    var filter2 = /^\d{10}$/;

    if ((!filter1.test(phone.value) && !filter2.test(phone.value)) || isBlank(phone))
    {
        setErrorBackground(phone, true);
        phone.focus;
        showPhoneErrorHint(true);
        return false;
    } else
    {
        setErrorBackground(phone, false);
        showPhoneErrorHint(false);
        return true;
    }
}

// Validates first name
function validateFirstName()
{
    // Gets name dom elements
    var firstName = document.getElementById("firstName");

    // Converts names to uppercase first letter
    if (!isBlank(firstName))
    {
        setErrorBackground(firstName, false);
        firstName.value = firstName.value.charAt(0).toUpperCase() + firstName.value.slice(1);
        return true;
    } else
    {
        setErrorBackground(firstName, true);
        return false;
    }
}

// Validates last name
function validateLastName()
{
    var lastName = document.getElementById("lastName");

    if (!isBlank(lastName))
    {
        setErrorBackground(firstName, false);
        lastName.value = lastName.value.charAt(0).toUpperCase() + lastName.value.slice(1);
        return true;
    } else
    {
        setErrorBackground(lastName, true);
        return false;
    }
}

// Validates password
function validatePassword()
{
    var password = document.getElementById("password");
    var filter   = /^(?=.*\d)(?=.*[a-z]).{6,9}$/;

    if (!filter.test(password.value) || isBlank(password))
    {
        setErrorBackground(password, true);
        password.focus;
        showPasswordErrorHint(true);
        return false;
    } else
    {
        setErrorBackground(password, false);
        showPasswordErrorHint(false);
        return true;
    }
}

// Validates membership
function validateMembership()
{
    var membership = document.getElementsByName("membership");
    var selectedValue;

    // Loops through selectable membership options
    for (i = 0; i < membership.length; i++)
    {
        // Check for a selected value
        if (membership[i].checked)
            selectedValue = membership[i].value;
    }

    // Validates choice
    if (selectedValue === undefined)
    {
        showMembershipErrorHint(true);
        membership.focus;
        return false;
    } else
    {
        showMembershipErrorHint(false);
        return true;
    }
}

// Shows or hides password error hint
function showPasswordErrorHint(isInError)
{
    var passwordErrorHint = document.getElementById("pwHint");

    if (isInError)
    {
        passwordErrorHint.hidden = false;
    } else
    {
        passwordErrorHint.hidden = true;
    }
}

// Shows or hides phone error hint
function showPhoneErrorHint(isInError)
{
    var phoneErrorHint = document.getElementById("phoneHint");

    if (isInError)
    {
        phoneErrorHint.hidden = false;
    } else
    {
        phoneErrorHint.hidden = true;
    }
}

// Shows or hides membership error hint
function showMembershipErrorHint(isInError)
{
    var membershipErrorHint = document.getElementById("membershipHint");

    if (isInError)
    {
        membershipErrorHint.hidden = false;
    } else
    {
        membershipErrorHint.hidden = true;
    }
}

// Changes background color of the fields
function setErrorBackground(element, isInError)
{
    if (isInError)
    {
        element.classList.add("error");
    } else
    {
        element.classList.remove("error");
    }
}

// Shows thanks div on successful registration
function showThanks(isRegistered)
{
    var formDiv   = document.getElementById("formDiv");
    var thanksDiv = document.getElementById("thanks");

    if (!isRegistered)
    {
        formDiv.hidden   = false;
        thanksDiv.hidden = true;
    } else
    {
        thanksDiv.hidden = false;
        formDiv.hidden   = true;
    }
}

// Wait until the page is loaded, before doing any DOM stuff
document.addEventListener("DOMContentLoaded", function ()
{
    showThanks(false);
    // Turns off hints
    showPasswordErrorHint(false);
    showPhoneErrorHint(false);
    showMembershipErrorHint(false);

    // Perform empty checks
    var mainForm = document.getElementById("registrationForm");

    // Listeners for the form on submit
    mainForm.addEventListener("submit", function (e)
    {
        // Performs validation checks
        var isFirstNameValid  = validateFirstName();
        var isLastNameValid   = validateLastName();
        var isPhoneValid      = validatePhone();
        var isEmailValid      = validateEmail();
        var isPasswordValid   = validatePassword();
        var isMembershipValid = validateMembership();

        if (!isFirstNameValid ||
            !isLastNameValid ||
            !isPhoneValid ||
            !isEmailValid ||
            !isPasswordValid ||
            !isMembershipValid)
        {
            e.preventDefault();
        } else
        {
            e.preventDefault();
            showThanks(true);
            alert("Registered successfully!");
        }
    });
});

// Changes background of input fields in focus
function setBackground(e)
{
    if (e.type == "focus")
    {
        e.target.style.backgroundColor = "lightgreen";
    } else if (e.type == "blur")
    {
        e.target.style.backgroundColor = "white";
    }
}

// Adds event listeners to change focus background
window.addEventListener("load", function ()
{
    var cssSelector = "input[type=text],input[type=password]";
    var fields      = document.querySelectorAll(cssSelector);

    for (i = 0; i < fields.length; i++)
    {
        fields[i].addEventListener("focus", setBackground);
        fields[i].addEventListener("blur", setBackground);
    }
});