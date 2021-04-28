A prototype (read: toy) full-stack e-health reporting system that uses versioned, structured data to enable more efficient and timely collection of pandemic status data and thus improve information governance.

Tech stack/other technical details using:

- React + Redux
- MaterialUI
- NodeJS + Express
- MongoDB
- Enterprise-grade architectures:
  - (Stripped-down) DDD (Domain-Driven Design) architecture in frontend
  - Clean Architecture (Uncle Bob) + a dabble of DDD in backend
- Environment-based (production, development, test) dependency injection (DI) in both frontend and backend
- SOLID programming principles
- Clean, modular, maintainable, easy-to-test, easy-to-read code

Here is some more information about this application, beginning with the home page:

![Home Screen](images/home%20screen.png)

As a form manager, one can upload [SDC](https://wiki.ihe.net/index.php/Structured_Data_Capture) (Structured Data Capture) compliant forms, and add patients and form fillers to the reporting system:

![Form Manager: Uploaded Forms](images/as%20manager%20-%20uploaded%20forms.png)

![Form Manager: Patients List](images/as%20manager%20-%20patients%20list.png)

![Form Manager: Form Filler List](images/as%20manager%20-%20form%20fillers.png)

As a form filler, one can create form responses for patients, in addition to view past filled-out form responses:

![Form Filler: Create Form Response 1](images/as%20form%20filler%20-%20create%20form%20response%201.png)

![Form Filler: Create Form Response 2](images/as%20form%20filler%20-%20create%20form%20response%202.png)

![Form Filler: View Form Responses](images/as%20form%20filler%20-%20view%20form%20responses.png)
