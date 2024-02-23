// handles all events on the dashboard
const patientHistory = document.getElementById('patientHistory');
const currentMedication = document.getElementById('currentMedication');
const patientAllergies = document.getElementById('patientAllergies');
const appointmentScheduler = document.getElementById('appointmentScheduler');
const healthInfo = document.getElementById('healthInfo');
const checkSymptoms = document.getElementById('checkSymptoms');
const emergencyServices = document.getElementById('emergencyServices');
const logout = document.getElementById('logout');

axios.get("/dashboard/username")
.then(response => {
			console.log(response);
		  document.getElementById('userName').innerText = response.username;
	})
	.catch(error => {
		console.log(error);
	})


patientHistory.addEventListener('click' , () => {
	historyData();		
});

currentMedication.addEventListener('click' , () => {
	medicationData();
});

patientAllergies.addEventListener('click' , () => {
		allergiesData();	
});

appointmentScheduler.addEventListener('click' , ()=> {
	appointmentData();
});

healthInfo.addEventListener('click' , () => {
	healthInfoData();
});

checkSymptoms.addEventListener('click' , () => {
	symptomsData();
});

emergencyServices.addEventListener('click' , () => {
	emergencyData();
});

logout.addEventListener('click', () => {
	 axios.get('http://localhost:3000/dashboard/logout');
});
