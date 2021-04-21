export const constant = {
    loggedInUser: {},
    isLogin: false,
    googlePlacesOption: {
        componentRestrictions: {
            country: [``]
        }
    },
    googleMapApiKey: ``,
    locationIconUrl: { url: (`../assets/images/locationIcon3.png`), scaledSize: { height: 40, width: 27 } },
    errorMessage: {
        required: `Please enter the missing information`,
        pattern: `Please make sure you have entered this information correctly`,
        selectOne: `Please select one`,
    },
    function: {
        numberOnly: (event: any) =>{
            const charCode = (event.which) ? event.which : event.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
              return false;
            }
            return true;
        },
        alphabetOnly: (event: any) =>{
            const charCode = (event.which) ? event.which : event.keyCode; // 32 is ASCII code of space bar
            if (charCode > 31 && charCode > 32 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
              return false;
            }
            return true;
        },
    },
    allowedImageFileTypes: [`image/jpg`, `image/jpeg`, `image/png`],
    regEx: {
        emailRegEx: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
        passwordRegEx: /^.{7,}$/,
    },
    bestWayToDescribeThisLocation: [
        { name: 'Paved Lot', value: 'pavedLot' },
        { name: 'Unpaved Lot / Field', value: 'unpavedLotField' },
        { name: 'Garage', value: 'garage' }
    ]
};
