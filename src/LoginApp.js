function LoginApp() {
    
    
    
    return (
        <>
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"></link>
   <div class="container">
      <div class="col-md-6 mx-auto text-center">
         <div class="header-title">
            <h1 class="wv-heading--title">
               Sign up for free!
            </h1>
            <h2 class="wv-heading--subtitle">
              Come and join the nations best property website.
            </h2>
         </div>
      </div>
      <div class="row">
         <div class="col-md-4 mx-auto">
            <div class="myform form ">
               <form action="" method="post" name="login">
                  <div class="form-group">
                     <input type="text" name="name"  class="form-control my-input" id="name" placeholder="Name"></input>
                  </div>
                  <div class="form-group">
                     <input type="email" name="email"  class="form-control my-input" id="email" placeholder="Email"></input>
                  </div>
                  <div class="form-group">
                     <input type="number" min="0" name="phone" id="phone"  class="form-control my-input" placeholder="Phone"></input>
                  </div>
                  <div class="text-center ">
                     <button type="submit" class=" btn btn-block send-button tx-tfm">Create Your Free Account</button>
                  </div>
                  <div class="col-md-12 ">
                     <div class="login-or">
                        <hr class="hr-or"></hr>
                        <span class="span-or">or</span>
                     </div>
                  </div>
                  <div class="form-group">
                     <a class="btn btn-block g-button" href="#">
                     <i class="fa fa-google"></i> Sign up with Google
                     </a>
                  </div>
                  <p class="small mt-3">By signing up, you are indicating that you have read and agree to the <a href="#" class="ps-hero__content__link">Terms of Use</a> and <a href="#">Privacy Policy</a>.
                  </p>
               </form>
            </div>
         </div>
      </div>
   </div>

            <div class="container" id="signInBox">
                <div class="form sign-in">
                    <h2>Welcome back fellow home guru!</h2>
                </div>
                <br/>
                <label>
                    <span>Email</span>
                    <input type="email" />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password"/>
                </label>
<br/>
                <button type="button" class="submit">Sign In</button>            
                <p class="forgot-pass">Forgot password?</p>
            <br/>
            <br/>
            <div class="img__text m--up">
                <h2>New here?</h2>
                <p>Sign up and discover great amount of new opportunities!</p>
                <button class="">Register</button>
            </div>

        </div >
</>        
    )
}

export default LoginApp;