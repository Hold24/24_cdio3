$(document).ready(function() {

	var numbers;

	//	Gets all userId's from the database.
	$.ajax({
		url: "http://localhost:8080/24_cdio3/rest2/cdio3/userids",
		method: "GET",
		success: function(data) {
			numbers = data;
		},
		error: function(error) {
			console.log(error);
		}

	});


	$("#UButton").click(function() {	
		if(validateID()){
			$("#UUDiv").load("updateUserForm.html");
			var userId = parseInt($('#userIDChosen').val());
			var user;
			$.ajax({
				url: "http://localhost:8080/24_cdio3/rest2/cdio3/users/" + userId,
				method: "GET",
				data: user,
				contentType: "application/json",
				success: function(data) {
					user = data;
					$("#userId").val(user.userId);
					$("#userName").val(user.userName);
					$("#ini").val(user.ini);
					$("#password").val(user.password);
					$("#cpr").val(user.cpr);
					//$('#UUData').load(user);
				},
				error: function(error) {
					alert("Error: " + error);
				}

			});			
		}

		//Invalid input - mark with red border around ID input field...
		$('input[type="number"]').keyup(function(){
			var value = $(this).val();
			if(value < 11 || value > 89) {
				$(this).attr('class', 'w3-border w3-border-red w3-input');
			}
			else {
				$(this).attr('class', 'w3-input');
			}
		});


		// To validate whether the chosen id to delete exists.
		function validateID() {
			var nr = parseInt($('#userIDChosen').val());
			for(i in numbers){
				if (numbers[i] == nr){
					return true;
				}
			}	
			alert("No user has that user ID...");
			return false;
		}

	});
});