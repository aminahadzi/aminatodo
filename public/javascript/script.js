
$(document).ready(function() {

    $('#tasks-list').on('click', 'button', function () {
        // attachiramo na #task-list jer se on ne brise. ovdje je selektor button

        const ths = $(this);
        const task = ths.val();

        $.ajax({
            dataType: 'json',
            data: {
                "requestType": "delete",
                "task": task
            },
            type: 'POST',
            url: "/todo",
            error: function (err) {
                console.log(err.message);
            },
            success: function (data, successText, xht) {
                getTasks();
            }
        });

    });

    $('#task_post').on('click', function () {
        const task = $('#task_input').val();

        if (validate(task)) {
            $.ajax({
                dataType: 'json',
                data: {
                    "requestType": "post",
                    "task": task
                },
                type: 'POST',
                url: "/todo",
                error: function (err) {
                    console.log(err.message);
                },
                success: function (data, successText, xht) {
                    $('#task_input').val('');
                    getTasks();
                }
            });

        }

    });

    getTasks();
});


function validate(task) {
    return task.trim().length > 0
}

function loadTasks(tasks) {
    $('#tasks-list').empty();

    tasks.forEach(function (t) {
        const d = "<li>" + t.task + "&nbsp;&nbsp;<button style='display: inline-block' " +
            "class='delete_X' name='task' value=" + t.id + "> &#215 </button></li>";
        console.log(d);
        $('#tasks-list').append(d);
    });

}

function getTasks() {
    const t = this;
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: '/todo/json',
        error: function (err) {
            console.log(err.message);
        },
        success: function (data, textStatus, jqXHR) {
            t.loadTasks(data);
        }
    });
}