from flask import Flask, session, render_template, url_for, redirect, request, jsonify
from functions import add_task, update_task, show_task, update_task_status
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/', methods=["GET"])
@cross_origin()
def home():  # put application's code here
    printall = show_task()
    response = {'status': 200,
                "data": show_task()
                }
    return response


@app.route('/show', methods=["GET"])
@cross_origin()
def show():  # put application's code here
    printall = show_task()
    response = {'status': 200,
                "data": printall
                }

    return response


@app.route('/add_task', methods=["GET", "POST"])
@cross_origin()
def addtask():
    if request.method == "POST":
        request_json = request.get_json()
        print(request_json)
        addtk = add_task(request_json)

        printall = show_task()
        response = {'status': 200,
                    "message": "new task added"
                    }
        return response
    else:
        return not_found()


@app.route('/update_task', methods=["PATCH"])
@cross_origin()
def updatetask():
    if request.method == "PATCH":
        request_json = request.get_json()
        updatetk = update_task(request_json)
        printall = show_task()
        response = {'status': 200,
                    "message": "task successfully added"
                    }
        return response
    else:
        return not_found()


@app.route('/update_task_status', methods=["PATCH"])
@cross_origin()
def updatetaskstatus():
    if request.method == "PATCH":
        request_json = request.get_json()
        updatetk = update_task_status(request_json)
        printall = show_task()
        response = {'status': 200,
                    "message": "task status successfully added"
                    }
        return response
    else:
        return not_found()


if __name__ == '__main__':
    app.run()


@app.errorhandler(404)
@cross_origin()
def not_found(error=None):
    response = {'status': 400,
                "message": "Not Found" + request.url
                }
    return jsonify(response)
