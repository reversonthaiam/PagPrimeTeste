$(function () {
    $(
        "#cadastroForm input,#cadastroForm textarea,#cadastroForm button"
    ).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            const nome = $("input#nome").val();
            const datanascimento = $("input#datanascimento").val();
            const cpf = $("input#cpf").val();
            const rg = $("input#rg").val();
            const nomemae = $("input#nomemae").val();
            const cep = $("input#cep").val();
            const logradouro = $("input#logradouro").val();
            const numero = $("input#numero").val();
            const complemento = $("input#complemento").val();
            const bairro = $("input#bairro").val();
            const cidade = $("input#cidade").val();
            const estado = $("input#estado").val();
            const email = $("input#email").val();
            const celular = $("input#celular").val();
            const curso = $("input#curso").val();
            const campus = $("input#campus").val();

            $this = $("#enviarCadastro");
            $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
            $.ajax({
                url: "/assets/mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message,
                },
                cache: false,
                success: function () {
                    // Success message
                    $("#success").html("<div class='alert alert-success'>");
                    $("#success > .alert-success")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success > .alert-success").append(
                        "<strong>Your message has been sent. </strong>"
                    );
                    $("#success > .alert-success").append("</div>");

                    $("#cadastroForm").trigger("reset");
                },
                error: function () {

                    $("#success").html("<div class='alert alert-danger'>");
                    $("#success > .alert-danger")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success > .alert-danger").append(
                        $("<strong>").text(
                            "Sorry " +
                            firstName +
                            ", it seems that my mail server is not responding. Please try again later!"
                        )
                    );
                    $("#success > .alert-danger").append("</div>");
                    //clear all fields
                    $("#cadastroForm").trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                    }, 1000);
                },
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
    $("#success").html("");
});
