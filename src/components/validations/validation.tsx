//***** Validation rules for input fields */
const validation = {
  mobile: {
    presence: {
      message: 'Please enter mobile number or email id',
    },
    format: {
      pattern: /^[0-9]{10,10}$/,
      message: 'Please enter a valid phone number',
    },
  },
  email: {
    presence: {
      message: 'Please enter mobile number or email id',
    },
    format: {
      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
      message: 'Please enter a valid email id',
    },
  },

  emailmobile: {
    presence: {
      message: 'Please enter mobile number or email id',
    },
  },

  fullname: {
    presence: {
      message: 'Please enter your fullname',
    },
    format: {
      pattern: /^(?!\s*$|\s).[a-z A-Z 0-9]{0,100}$/,
      message:
        'Please enter valid fullname and it should not be more than 50 characters.',
    },
    // format: {
    //   pattern: /^(?!\s*$|\s).*$/,
    //   message: "Please enter a valid first name"
    // }
  },
  first_name: {
    presence: {
      message: 'Please enter your first name',
    },
    format: {
      pattern: /^(?!\s*$|\s).[a-z A-Z 0-9]{0,19}$/,

      message:
        'Please enter valid first name and it should not be more than 20 characters',
    },
  },
  last_name: {
    presence: {
      message: 'Please enter your last name',
    },
    format: {
      pattern: /^(?!\s*$|\s).[a-z A-Z 0-9]{0,19}$/,
      // pattern : /^[a-zA-Z]{0,9}( [a-zA-Z]{0,19})+$/,

      message:
        'Please enter valid last name and it should not be more than 20 characters',
    },
  },
  owner_name: {
    presence: {
      message: 'Please enter your owner name',
    },
    format: {
      pattern: /^(?!\s*$|\s).[a-z A-Z 0-9]{0,19}$/,
      message:
        'Please enter valid owner name and it should not be more than 20 characters.',
    },
  },
  name: {
    presence: {
      message: 'Please enter your name',
    },
    format: {
      pattern: /^(?!\s*$|\s).[a-z A-Z 0-9]{0,19}$/,
      message:
        'Please enter valid name and it should not be more than 20 characters.',
    },
  },
  checkedterm: {
    presence: {
      message: 'Please accept terms and conditions',
    },
  },
  location: {
    presence: {
      message: 'Please enter your location',
    },
  },
  suburb: {
    presence: {
      message: 'Please enter your suburb',
    },
    format: {
      pattern: /^(?!\s*$|\s).*$/,
      message: 'Please enter a valid suburb',
    },
  },
  state: {
    presence: {
      message: 'Please enter your state',
    },
    format: {
      pattern: /^(?!\s*$|\s).*$/,
      message: 'Please enter a valid state',
    },
  },
  zipcode: {
    presence: {
      message: 'Please enter your zipcode',
    },
    format: {
      pattern: /^[0-9]{4,8}$/,
      message: 'Your zipcode must be between 4-8 digits',
    },
  },
  dob: {
    presence: {
      message: 'Please select your date of birth',
    },
  },

  joiningdate: {
    presence: {
      message: 'Please select your joining date',
    },
  },

  startdate: {
    presence: {
      message: 'Please select your start date',
    },
  },
  enddate: {
    presence: {
      message: 'Please select your end date',
    },
  },
  kycidselect: {
    presence: {
      message: 'Please select ekyc verification type',
    },
  },

  kycid: {
    presence: {
      message: 'Please enter your eKYC ID',
    },
  },

  kycidname: {
    presence: {
      message: 'Please enter your full name mentioned in kyc documents',
    },
  },

  FrontImage: {
    presence: {
      message: 'Please select your front image',
    },
  },

  BackImage: {
    presence: {
      message: 'Please select your back image',
    },
  },

  day: {
    presence: {
      message: 'Please select your date of birth',
    },
  },
  sta: {
    presence: {
      message: 'Please select your state',
    },
  },
  city: {
    presence: {
      message: 'Please select your city',
    },
  },
  school: {
    presence: {
      message: 'Please select your school',
    },
  },
  schoolname: {
    presence: {
      message: 'Please enter your school name',
    },
  },
  boardname: {
    presence: {
      message: 'Please enter your university name',
    },
  },
  zatchupid: {
    presence: {
      message: 'Please enter your zatchup ID',
    },
  },

  address: {
    presence: {
      message: 'Please enter your address',
    },
  },

  coursename: {
    presence: {
      message: 'Please enter your course name',
    },
  },
  coursekey: {
    presence: {
      message: 'Please select your course',
    },
  },

  joiningstandardkey: {
    presence: {
      message: 'Please select your joining standard',
    },
  },

  joiningcurrentkey: {
    presence: {
      message: 'Please select your current standard',
    },
  },

  joiningstandardkey2: {
    presence: {
      message: 'Please select your left standard',
    },
  },

  joiningstandard: {
    presence: {
      message: 'Please select your joining standard',
    },
  },

  class: {
    presence: {
      message: 'Please select your class',
    },
  },

  schoolid: {
    presence: {
      message: 'Please enter your school id',
    },
    format: {
      //pattern: /^[0-9]{12}$/
      pattern: /^[0-9\b]+$/,
      
      message: "Please enter valid school id"
    },
  },

  addmissionno: {
    presence: {
      message: 'Admission number is required',
    },
    format: {
      //pattern: /^[0-9]{12}$/
      pattern: /^[0-9\b]+$/,
      
      message: "Admission number is required"
    },
  },


  rollno_: {
    presence: {
      message: 'Roll number is required',
    },
    format: {
      //pattern: /^[0-9]{12}$/
      pattern: /^[0-9\b]+$/,
      
      message: "Roll number is required"
    },
  },

  rollno: {
    presence: {
      message: 'Please enter your roll no',
    },
    format: {
      //pattern: /^[0-9]{12}$/
      pattern: /^[0-9\b]+$/,
      
      message: "Please enter valid roll no"
    },
  },

  Des: {
    presence: {
      message: 'Please enter your description',
    },
  },

  gender: {
    presence: {
      message: 'Please select your Gender',
    },
  },
  Mother: {
    presence: {
      message: 'Please enter your mother name',
    },
  },

  Father: {
    presence: {
      message: 'Please select father name',
    },
  },
  month: {
    presence: {
      message: 'Please enter your date of birth',
    },
  },
  year: {
    presence: {
      message: 'Please enter your date of birth',
    },
  },

  license_no: {
    presence: {
      message: 'Please enter your license number for parking space',
    },
  },
  confirm_password: {
    presence: {
      message: 'Please enter a confirm password',
    },
    format: {
      pattern:
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/, // Minimum eight characters, at least one letter, one number and one special character:
      message:
        'Passwords must be alphanumeric and minimum of 8 digits. It is mandatory to use numbers and special characters in the password',
    },
    length: {
      minimum: 8,
      maximum: 12,
      message: 'Your password must be between 8 and 12 characters',
    },
    match: {
      message: 'Password and confirm password is not same',
    },
  },
  password: {
    presence: {
      message: 'Please enter a password',
    },
    format: {
      //pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/, //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
      pattern:
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/, // Minimum eight characters, at least one letter, one number and one special character:
      message:
        'Passwords must be alphanumeric and minimum of 8 digits. It is mandatory to use numbers and special characters in the password',
    },
    length: {
      minimum: 8,
      maximum: 12,
      message: 'Your password must be between 8 and 12 characters',
    },
  },
  new_password: {
    presence: {
      message: 'Please enter new password',
    },
    format: {
      pattern:
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/, // Minimum eight characters, at least one letter, one number and one special character:
      message:
        'Passwords must be alphanumeric and minimum of 8 digits. It is mandatory to use numbers and special characters in the password',

      // pattern: /^\S*$/,
      //  message: "Spaces are not allowed"
    },
    length: {
      minimum: 8,
      maximum: 12,
      message: 'Your password must be between 8 and 12 characters',
    },
  },
  image: {
    presence: {
      message: 'Please upload a profile picture',
    },
  },
  login_password: {
    presence: {
      message: 'Please enter a password',
    },
  },
  old_password: {
    presence: {
      message: 'Please enter old password',
    },
  },
  otp: {
    presence: {
      message: 'Please enter One Time Password',
    },
    format: {
      pattern: /^[0-9]{4,4}$/,
      message: 'Please enter a valid One Time Password',
    },
    length: {
      minimum: 4,
      message: 'Please enter a valid One Time Password',
    },
  },
  cardNumber: {
    presence: {
      message: 'Please enter card number',
    },
    format: {
      pattern: /^[0-9]{16,16}$/,
      message: 'Please enter a valid card number',
    },
    // format: {
    //   pattern: /^[0-9]*$/,
    //   message: "Please enter a valid card number"
    // }
  },
  cardName: {
    presence: {
      message: 'Please enter name on card',
    },
    format: {
      pattern: /^(?!\s*$|\s).[a-z A-Z]{0,29}$/,
      message:
        'Please enter valid name and it should not be more than 30 characters.',
    },
  },
  cvv: {
    presence: {
      message: 'Please enter cvv',
    },
    format: {
      pattern: /^[0-9]{3,4}$/,
      message: 'Please enter a valid cvv',
    },
    length: {
      minimum: 3,
      message: 'Your cvv must be at least 3 digits',
    },
  },

  AadharNumber: {
    presence: {
      message: 'Please enter your aadhaar card number',
    },
    format: {
      pattern: /^[0-9]{12}$/,
      message: "Aadhaar number must be of 12 digits"
    },
    length: {
      minimum: 12,
      maximum: 12,
      message: 'Aadhaar number must be of 12 digits',
    },
  },

  DrivingLicence: {
    presence: {
      message: 'Please enter your driving licence number',
    },
    // format: {
    //   pattern: /[a-z A-Z]{16}$/,
    //   message: "Driving licence number must be of 16 characters"
    // },
    length: {
      minimum: 16,
      maximum: 16,
      message: 'Driving licence number must be of 16 characters',
    },
  },

  PassportNumber: {
    presence: {
      message: 'Please enter your passport number',
    },
    // format: {
    //   pattern: /[a-z A-Z]{16}$/,
    //   message: "Your driving licence number must be 16 characters"
    // },
    length: {
      minimum: 8,
      maximum: 8,
      message: 'Passport number must be of 8 characters',
    },
  },

  accountNumber: {
    presence: {
      message: 'Please enter your account number',
    },
    format: {
      pattern: /^[0-9]{6,12}$/,
      message: 'Your account number must be between 6 and 12 digits',
    },
    length: {
      minimum: 6,
      maximum: 12,
      message: 'Your account number must be between 6 and 12 digits',
    },
  },
  bsb: {
    presence: {
      message: 'Please enter bsb',
    },
    format: {
      pattern: /^[0-9]{6,6}$/,
      message: 'Your bsb must be of 6 digits',
    },
    length: {
      minimum: 6,
      maximum: 6,
      message: 'Your bsb must be of 6 digits',
    },
  },
  bankName: {
    presence: {
      message: 'Please enter your bank name',
    },
    format: {
      pattern: /^(?!\s*$|\s).[a-z A-Z]{0,29}$/,
      message:
        'Please enter valid bank name and it should not be more than 30 characters. ',
    },
  },
  accountHolderName: {
    presence: {
      message: 'Please enter account holder name',
    },
    format: {
      pattern: /^(?!\s*$|\s).[a-z A-Z]{0,39}$/,
      message:
        'Please enter valid account holder name and it should not be more than 40 characters.',
    },
    // format: {
    //   pattern: /^(?!\s*$|\s).*$/,
    //   message: "Please enter a valid account holder name"
    // }
  },
  pronoun: {
    presence: {
      message: 'Please select your pronoun.',
    },
  },
  postalcode: {
    presence: {
      message: 'Please Enter Code',
    },
    format: {
      pattern: /[0-9]/,
      message: 'Please Enter Valid Postal Code',
    },
  },
};

export default validation;
