$(".newUserForm").on("submit", event=>{
    event.preventDefault();

    var newUser ={
        firstName : $("#firstName").val().trim(),
        lastName : $("#lastName").val().trim(),
        email : $("#email").val().trim(),
        userName : $("#userName").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/users", {
        type: "POST",
        data: newUser
      }).then(function() {
          console.log("new user posted");
          // Reload the page to get the updated list
          location.reload();
        });
    });