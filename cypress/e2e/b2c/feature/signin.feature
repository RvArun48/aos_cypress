Feature: Login Functionality Validation
I want to use this feature file to validate login feature
  @Login
  Scenario: I validate the login functionality with a valid user name and password
  Given I want to open the application
  Then I verify the elements present in the login page
  Then I login to the application using "user_b2c"
  
    @Login
  Scenario: I validate the login functionality with a Empty user name and password
  Given I want to open the application
  Then I login to the application using "no_username_no_password"
  
    @Login
  Scenario: I validate the login functionality with a valid user name and Empty password
  Given I want to open the application
  Then I login to the application using "valid_username_no_password"
  
    @Login
  Scenario: I validate the login functionality with a Empty user name and valid password
  Given I want to open the application
  Then I login to the application using "no_username_Valid_password"
  
    @Login
  Scenario: I validate the login functionality with a valid user name and Invalid password
  Given I want to open the application
  Then I login to the application using "valid_username_invalid_password"
  
   @Login
  Scenario: I validate the login functionality with a Invalid user name and valid password
  Given I want to open the application
  Then I login to the application using "invalid_username_Valid_password"
  
  
  @ForgotPassword
  Scenario: I validate all the elements in the header of the home page
  Given I want to open the application
  But I forgot the password and I want to reset it for "user_b2c"
  
  @Signup
  Scenario: I validate all the elements in the header of the home page
  Given I want to open the application
  Then I signup to create a new account
  #And I verify that I am able to login with the created account
  
  
  
  