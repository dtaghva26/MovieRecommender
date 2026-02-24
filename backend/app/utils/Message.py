from flask import jsonify

class Message:

    @staticmethod
    def success(message="Success", data=None, status_code=200):
        response = {
            "success": True,
            "message": message,
            "data": data
        }
        return jsonify(response), status_code

    @staticmethod
    def error(message="Error", status_code=400, errors=None):
        response = {
            "success": False,
            "message": message,
            "errors": errors
        }
        return jsonify(response), status_code