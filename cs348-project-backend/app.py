# app.py
from urllib import request
from flask import *
import json
import mysql.connector
from flask import flash
import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

if __name__ == "__main__":
     app.run()


@app.route("/restaurants/<string:name>")
def get_restaurant(name):
    try:
        conn = mysql.connector.connect(user='root', password='Neel1123!',host='127.0.0.1',database='project1CS348')
        cursor = conn.cursor(prepared=True)
        cursor.execute("SELECT restaurantName, streetAddress, zipCode, Email,phoneNumber, website, cuisineType FROM Restaurant WHERE restaurantName =%s", (name,))
        restRow = cursor.fetchone()
        respone = jsonify(restRow)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()
        
@app.route("/restaurants/cuisines")
def get_cuisines():
    try:
        conn = mysql.connector.connect(user='root', password='Neel1123!',host='127.0.0.1',database='project1CS348')
        cursor = conn.cursor(prepared=True)
        cursor.execute("SELECT distinct cuisineType FROM Restaurant order by cuisineType asc")
        restRow = cursor.fetchall()
        respone = jsonify(restRow)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()        

@app.route("/restaurants", methods = ['GET'])
def find_restaurant():
    try:
        zipCode = request.args.get("zipCode")
        cuisineType = request.args.get("cuisineType")
        print(cuisineType)
        print(zipCode)        
        if zipCode is None:
            conn = mysql.connector.connect(user='root', password='Neel1123!',host='127.0.0.1',database='project1CS348')
            cursor = conn.cursor(prepared=True)
            cursor.execute("SELECT restaurantName, streetAddress, zipCode, Email,phoneNumber, website, cuisineType, avg(rating) as 'avgRating' FROM Restaurant R left join Review V on R.restaurantId=V.restaurantId group by R.restaurantId having R.cuisineType =%s", (cuisineType,))
            restRow = cursor.fetchall()
            respone = jsonify(restRow)
            respone.status_code = 200
            return respone
        else:
            conn = mysql.connector.connect(user='root', password='Neel1123!',host='127.0.0.1',database='project1CS348')
            cursor = conn.cursor(prepared=True)
            print("cuisineType="+cuisineType)
            sqlQuery = "SELECT restaurantName, streetAddress, zipCode, Email,phoneNumber, website, cuisineType, avg(rating) as 'avgRating' FROM Restaurant R left join Review V on R.restaurantId=V.restaurantId group by R.restaurantId having R.zipCode =%s and R.cuisineType=%s;"
            bindData = (zipCode, cuisineType)
            cursor.execute(sqlQuery, bindData)	
            restRow = cursor.fetchall()
            print("find_restaurant 1")	        
            respone = jsonify(restRow)
            print("find_restaurant 3")	        
            print(respone)
            respone.status_code = 200
            return respone

    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()





@app.route('/restaurants/<string:name>', methods = ['DELETE'])
def delete_restaurant(name):
	try:
		conn = mysql.connector.connect(user='root', password='Neel1123!',host='127.0.0.1',database='project1CS348')
		cursor = conn.cursor()
		args=(name,)
		cursor.callproc('delete_restaurant', args)
		conn.commit()
		respone = jsonify('Success')
		respone.status_code = 200
		return respone
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()

@app.route("/restaurants", methods = ['POST'])
def create_restaurant():

    try :
        conn = mysql.connector.connect(user='root', password='Neel1123!',host='127.0.0.1',database='project1CS348')
        cursor = conn.cursor(prepared=True)
        restaurant = request.get_json()
        name = restaurant["restaurantName"]
        address = restaurant["streetAddress"]
        zip = restaurant["zipCode"]
        email = restaurant["Email"]
        phone = restaurant["phoneNumber"]
        website = restaurant["website"]
        cuisine = restaurant["cuisineType"]
        sqlQuery = "insert into restaurant values (0 ,%s,%s,%s,%s,%s,%s,%s);"
        bindData = (name, address, zip, email, phone, website, cuisine)
        cursor.execute(sqlQuery, bindData)
        conn.commit()
        response = "The restaurant has been successfully added"
        return response
        

    except Exception as e:
        print(e)
        return "The restaurant was not able to be added"
    finally:
        cursor.close()
        conn.close()
        
              
@app.route("/restaurants/<string:name>", methods = ['PUT'])
def update_restaurant(name):
    try :
        conn = mysql.connector.connect(user='root', password='Neel1123!',host='127.0.0.1',database='project1CS348')
        cursor = conn.cursor(prepared=True)
        print("step1")
        if request.is_json:
            print("update restaurant")
            restaurant = request.get_json()
            #name = restaurant["restaurantName"]
            address = restaurant["streetAddress"]
            zip = restaurant["zipCode"]
            email = restaurant["Email"]
            phone = restaurant["phoneNumber"]
            website = restaurant["website"]
            cuisine = restaurant["cuisineType"]
            sqlQuery = "update restaurant set restaurantName = %s, streetAddress = %s, zipCode = %s, Email = %s, phoneNumber = %s, website = %s, cuisineType = %s where restaurantName = %s;"
            bindData = (name, address, zip, email, phone, website, cuisine, name)
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            response = jsonify("Success")
            response.status_code = 200

            return response
        else:
            print("step3")
            response = jsonify("Invalid Request")
            print(response)
            response.status_code = 400
            return response


    except Exception as e:
        print(e)
        print("step4")
    finally:
        print("step5")
        cursor.close()
        conn.close()

@app.route("/users", methods = ['POST'])
def create_user():
    try :
        conn = mysql.connector.connect(user='root', password='Neel1123!',host='127.0.0.1',database='project1CS348')
        cursor = conn.cursor(prepared=True)
        user = request.get_json()
        username = user["username"]
        firstname = user["firstname"]
        lastname = user["lastname"]
        email = user["email"]
        password = user["password"]
        sqlQuery = "insert into user values (%s,%s,%s,%s,%s);"
        bindData = (username, firstname, lastname, email, password)
        cursor.execute(sqlQuery, bindData)
        conn.commit()
        return "was able to add user"
    except Exception as e:
        print(e)
        return "wasn't able to add user"
    finally:
        cursor.close()
        conn.close()

@app.route("/users/<string:username>")
def get_user(username):
    try:
        conn = mysql.connector.connect(user='root', password='Neel1123!',host='127.0.0.1',database='project1CS348')
        cursor = conn.cursor(prepared=True)
        cursor.execute("SELECT username, firstName, lastName, Email FROM User WHERE username = %s", (username,))
        restRow = cursor.fetchone()
        respone = jsonify(restRow)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close() 

@app.route('/users/<string:username>', methods = ['DELETE'])
def delete_user(username):
	try:
		conn = mysql.connector.connect(user='root', password='Neel1123!',host='127.0.0.1',database='project1CS348')
		cursor = conn.cursor()
		args=(username,)
		cursor.callproc('delete_user', args)
		conn.commit()
		respone = jsonify('Success')
		respone.status_code = 200
		return respone
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()
          

@app.route("/users/<string:username>", methods = ['PUT'])
def update_user(username):
    try :
        conn = mysql.connector.connect(user='root', password='Neel1123!',host='127.0.0.1',database='project1CS348')
        cursor = conn.cursor(prepared=True)
        if request.is_json:
            user = request.get_json()
            fname = user["firstName"]
            lname = user["lastName"]
            email = user["email"]
            pw = user["password"]
            sqlQuery = "update user set firstName = %s, lastName = %s, Email = %s, Password = %s where username = %s;"
            bindData = (fname, lname, email, pw, username)
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            response = jsonify("Success")
            response.status_code = 200
            print("HI")
            return response
        else:
            response = jsonify("Invalid Request")
            response.status_code = 400
            return response
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route("/reviews", methods = ['POST'])
def create_review():
    try :
        conn = mysql.connector.connect(user='root', password='Neel1123!',host='127.0.0.1',database='project1CS348')
        cursor = conn.cursor(prepared=True)
        if request.is_json:
            review = request.get_json()
            username = review["username"]
            restaurantName = review["restaurantName"]
            rating = review["rating"]
            textReview = review["textReview"]
            sqlQuery = "insert into review values (0 ,%s, (SELECT restaurantId FROM Restaurant WHERE restaurantName=%s),%s,%s, CURRENT_TIMESTAMP());"
            bindData = (username, restaurantName, rating, textReview)
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            response = "Successfully added review"
            return response
    except Exception as e:
        print(e)
        return "Failed to add Review"
    finally:
        cursor.close()
        conn.close()


@app.route("/reviews", methods = ['GET'])
def find_reviews():
    try:
        username = request.args.get("username")
        conn = mysql.connector.connect(user='root', password='Neel1123!',host='127.0.0.1',database='project1CS348')
        cursor = conn.cursor(prepared=True)
        cursor.execute("SELECT restaurantName, rating, textReview FROM Review RV join Restaurant R on RV.restaurantId=R.restaurantId WHERE username=%s;", (username,))
        restRow = cursor.fetchall()
        respone = jsonify(restRow)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close() 


@app.route('/review/<string:id>', methods = ['DELETE'])
def delete_review(id):
	try:
		conn = mysql.connector.connect(user='root', password='Neel1123!',host='127.0.0.1',database='project1CS348')
		cursor = conn.cursor(prepared=True)
		cursor.execute("DELETE FROM review WHERE reviewId =%s", (id,))
		conn.commit()
		respone = jsonify('Success')
		respone.status_code = 200
		return respone
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()
          

@app.route("/review/update/<string:reviewId>", methods = ['PUT'])
def update_review(reviewId):
    try :
        conn = mysql.connector.connect(user='root', password='Neel1123!',host='127.0.0.1',database='project1CS348')
        cursor = conn.cursor(prepared=True)
        
        if request.is_json:
            review = request.get_json()
            rating = review["rating"]
            textReview = review["textReview"]
            dateTime = review["dateTime"]
            sqlQuery = "update review set rating = %s, textReview = %s, dateTime = %s where reviewId = %s;"
            bindData = (rating, textReview, dateTime, reviewId)
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            response = jsonify("Success")
            response.status_code = 200
            print("HI")
            return response
        else:
            response = jsonify("Invalid Request")
            response.status_code = 400
            return response
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()
        