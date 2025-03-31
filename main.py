import os
from flask import Flask, render_template, request, jsonify, redirect, url_for
import sqlite3

app = Flask(__name__)
name = "guest"
admin = False

import sqlite3

def createSitesTable():
    conn = sqlite3.connect('sites.db')
    c = conn.cursor()
    
    c.execute('''CREATE TABLE IF NOT EXISTS sites
                (user TEXT NOT NULL,
                siteName TEXT NOT NULL,
                url TEXT NOT NULL,
                image TEXT NOT NULL,
                showBoard BOOL NOT NULL,
                UNIQUE(user, siteName))''')
    image_add = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"

    conn.commit()
    conn.close()

createSitesTable()

def createFavSitesTable():
    conn = sqlite3.connect('favSites.db')
    c = conn.cursor()
    
    c.execute('''CREATE TABLE IF NOT EXISTS favSites
                (user TEXT UNIQUE NOT NULL,
                site1 TEXT NOT NULL,
                site2 TEXT NOT NULL,
                site3 TEXT NOT NULL,
                site4 TEXT NOT NULL,
                site5 TEXT NOT NULL)''')

    conn.commit()
    conn.close()

createFavSitesTable()

def createUsersTable():
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users
                (username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                name TEXT NOT NULL,
                familyName TEXT NOT NULL,
                email TEXT NOT NULL,
                admin BOOL NOT NULL )''')
    c.execute("INSERT OR REPLACE INTO users VALUES (?, ?, ?, ?, ?, ?)", ("Idk", "0f04j284Q!", "Gev", "Klas", "klasgev@gmail.com", 1))
    c.execute("INSERT OR REPLACE INTO users VALUES (?, ?, ?, ?, ?, ?)", ("TestUser", "1aaAa!", "none", "none", "none", 0))

    conn.commit()
    conn.close()

createUsersTable()

def delete_user_from_database(username):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("DELETE FROM users WHERE username=?", (username,))
    conn.commit()
    conn.close()

def delete_site_from_database(siteName):
    conn = sqlite3.connect('sites.db')
    c = conn.cursor()
    c.execute("DELETE FROM sites WHERE siteName=?", (siteName,))
    conn.commit()
    conn.close()

@app.route('/add_to_siteboard', methods=['POST'])
def add_to_siteboard():
    data = request.get_json()
    siteName = data.get('siteName')
    showBoard = data.get('showBoard')

    if siteName is not None and showBoard is not None:
        conn = sqlite3.connect('sites.db')
        c = conn.cursor()

        c.execute("UPDATE sites SET showBoard=? WHERE siteName=?", (showBoard, siteName))

        conn.commit()
        conn.close()

        return jsonify({"status": "success", "showBoard": showBoard}), 200
    else:
        return jsonify({"status": "error", "message": "Missing siteName or showBoard"}), 400

@app.route("/")
def home():
    global name
    global admin

    conn = sqlite3.connect('sites.db')
    c = conn.cursor()

    c.execute("SELECT * FROM sites")
    sites = c.fetchall()

    conn.close()


    conn = sqlite3.connect('favSites.db')
    c = conn.cursor()

    c.execute("SELECT * FROM favSites")
    
    favSites = c.fetchall()

    conn.close()

    return render_template('home.html', name = name, admin = admin, sites = sites, favSites = favSites)

@app.route("/settings")
def settings():
    conn = sqlite3.connect('sites.db')
    c = conn.cursor()

    c.execute("SELECT * FROM sites")
    sites = c.fetchall()

    conn.close()
    return render_template('settings.html', name = name, admin = admin, sites = sites)

@app.route("/adminpage")
def adminpage():
    conn = sqlite3.connect('users.db')
    c = conn.cursor()

    c.execute("SELECT * FROM users")
    users = c.fetchall()

    conn.close()

    if admin == True:
        return render_template('adminpage.html', name = name, admin = admin, users = users)
    else:
        return render_template('accessdenied.html', name = name, admin = admin)

@app.route('/make_admin_user', methods=['POST'])
def make_admin_user():
    username = request.form['username']
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("UPDATE users SET admin = (CASE WHEN admin = 1 THEN 0 ELSE 1 END) WHERE username = ?", (username,))
    conn.commit()
    conn.close()
    return redirect(url_for('adminpage'))

@app.route("/all_sites")
def allSites():
    global name
    global admin

    conn = sqlite3.connect('sites.db')
    c = conn.cursor()

    c.execute("SELECT * FROM sites")
    sites = c.fetchall()

    conn.close()

    if name == "guest":
        return render_template('accessdenied.html', name=name, admin=admin)
    else:
        return render_template('allSites.html', name=name, admin=admin, sites=sites)

@app.route('/get_user_sites')
def get_user_sites():
    global name

    if name == "guest":
        return render_template('accessdenied.html', name=name, admin=admin)
    
    conn = sqlite3.connect('sites.db')
    c = conn.cursor()

    c.execute("SELECT siteName FROM sites WHERE user=?", (name,))
    user_sites = c.fetchall()

    conn.close()

    site_names = [site[0] for site in user_sites]

    return jsonify(site_names)

@app.route('/get_fav_sites')
def get_fav_sites():
    global name

    conn1 = sqlite3.connect('favSites.db')
    c1 = conn1.cursor()
    conn2 = sqlite3.connect('sites.db')
    c2 = conn2.cursor()

    c1.execute("SELECT * FROM favSites WHERE user=?", (name,))
    user_from_table = c1.fetchone()

    response = []

    if user_from_table:
        # Loop through the 5 favorite sites
        for i in range(1, 6):
            c1.execute(f"SELECT site{i} FROM favSites WHERE user=?", (name,))
            site_name = c1.fetchone()
            if site_name:
                site_name = site_name[0]

                c2.execute("SELECT url FROM sites WHERE user=? AND siteName=?", (name, site_name))
                url = c2.fetchone()
                if url:
                    url = url[0]

                c2.execute("SELECT image FROM sites WHERE user=? AND siteName=?", (name, site_name))
                image = c2.fetchone()
                if image:
                    image = image[0]

                # Add the site data to the response as JavaScript variables
                response.append(f'var siteName{i} = "{site_name}";')
                response.append(f'var url{i} = "{url}";')
                response.append(f'var image{i} = "{image}";')
            else:
                # If no site is found, set "none" for the variables
                response.append(f'var siteName{i} = "none";')
                response.append(f'var url{i} = "none";')
                response.append(f'var image{i} = "none";')

        # Return the response with the JavaScript variables
        return "\n".join(response)
    
    # If no user is found, return default values for all sites
    default_response = [
        'var siteName1 = "none";',
        'var url1 = "none";',
        'var image1 = "none";',
        'var siteName2 = "none";',
        'var url2 = "none";',
        'var image2 = "none";',
        'var siteName3 = "none";',
        'var url3 = "none";',
        'var image3 = "none";',
        'var siteName4 = "none";',
        'var url4 = "none";',
        'var image4 = "none";',
        'var siteName5 = "none";',
        'var url5 = "none";',
        'var image5 = "none";'
    ]
    return "\n".join(default_response)

@app.route("/settings", methods=['GET', 'POST'])
def addFavSite():
    global name
    global admin

    if name == "guest":
        return render_template('accessdenied.html', name=name, admin=admin)

    conn = sqlite3.connect('favSites.db')
    c = conn.cursor()
    if request.method == 'POST':
        site1 = request.form['site1']
        site2 = request.form['site2']
        site3 = request.form['site3']
        site4 = request.form['site4']
        site5 = request.form['site5']
        
        c.execute("SELECT * FROM favSites WHERE user=?", (name,))
        user_from_table = c.fetchone()

        if user_from_table:
            c.execute("UPDATE favSites SET user=?, site1=?, site2=?, site3=?, site4=?, site5=? WHERE user = ?", (name, site1, site2, site3, site4, site5, name,))
            conn.commit()
            conn.close()
            return render_template('settings.html', name=name, admin=admin)
        else:
            c.execute("INSERT INTO favSites VALUES (?, ?, ?, ?, ?, ?)", (name, site1, site2, site3, site4, site5,))
            conn.commit()
            conn.close()
            return render_template('settings.html', name=name, admin=admin)
    return render_template('settings.html', name=name, admin=admin)

@app.route("/site_board")
def leaderboard():
    global name
    global admin

    conn = sqlite3.connect('sites.db')
    c = conn.cursor()
    
    if name == "guest":
        conn.close()
        return render_template('accessdenied.html', name=name, admin=admin)
    else:
        c.execute("""SELECT url, COUNT(DISTINCT user) as count
            FROM sites
            WHERE showBoard = 1
            GROUP BY url
            ORDER BY count DESC""")
        board = c.fetchall()

    conn.commit()
    conn.close()
    return render_template('siteBoard.html', name=name, admin=admin, board=board)

@app.route("/add_site", methods=['GET', 'POST'])
def addSite():
    global name 

    global admin

    if name == "guest":
        return render_template('accessdenied.html', name=name, admin=admin)
   
    conn = sqlite3.connect('sites.db')
    c = conn.cursor()

    c.execute("SELECT * FROM sites")
    sites = c.fetchall()

    if request.method == 'POST':
        siteName = request.form['siteName']
        siteUrl = request.form['siteUrl']
        imageUrl = request.form['imageUrl']

        c.execute("SELECT * FROM sites WHERE user = ? AND siteName = ?", (name, siteName))
        siteName_from_table = c.fetchone()

        if siteName_from_table:
            emEnd = "the site name already exists"
            conn.close()
            return render_template('addSite.html', emEnd = emEnd, name=name, admin=admin, sites=sites)
        else:
            c.execute("INSERT INTO sites VALUES (?, ?, ?, ?, ?)", (name, siteName, siteUrl, imageUrl, False))
            conn.commit()
            return redirect(url_for('allSites'))
    
    conn.close()
    return render_template('addSite.html', name=name, admin=admin, sites=sites)


@app.route("/logout")
def logout():
    global name
    global admin
   
    name = "guest"
    admin = False
    return render_template('home.html', name = name, admin = admin)

@app.route("/signup", methods=['GET', 'POST'])
def signup():
    global name
    global users
    global passwords
    global admin
   
    conn = sqlite3.connect('users.db')
    c = conn.cursor()

    if name != "guest":
        return render_template('accessdenied.html', name = name, admin = admin)
    else:
        if request.method == 'POST':
            password = request.form['password']
            username = request.form['username']
            name = request.form['name']
            familyName = request.form['familyName']
            email = request.form['email']


            c.execute("SELECT * FROM users WHERE username = ?", (username,))
            user_from_table = c.fetchone()

            if user_from_table:
                emEnd = "username already taken"
                conn.close()
                return render_template('signup.html', emEnd = emEnd, admin = admin)
            else:
                c.execute("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)", (username, password, name, familyName, email, 0))
                name = username
                conn.commit()
                conn.close()
                return render_template('home.html', name = name, admin = admin)
            
        conn.commit()
        conn.close()
        return render_template('signup.html', name = name, admin = admin)

@app.route("/login", methods=['GET', 'POST'])
def login():
    global name
    global users
    global passwords
    global admin
   
    conn = sqlite3.connect('users.db')
    c = conn.cursor()

    if name != "guest":
        return render_template('accessdenied.html', name = name, admin = admin)
    else:
        if request.method == 'POST':
            password = request.form['password']
            username = request.form['username']

            c.execute("SELECT * FROM users WHERE username = ?", (username,))
            user_from_table = c.fetchone()

            if not user_from_table:
                emEnd = "username does not exist"
                conn.close()
                return render_template('login.html', emEnd = emEnd, admin = admin)
            if user_from_table[1] == password:
                name = username
                if user_from_table[5] == 1:
                    admin = True
                conn.commit()
                conn.close()
                return render_template('home.html', name = name, admin = admin)
            else:
                emEnd = "password does not match the username"
                conn.close()
                return render_template('login.html', emEnd = emEnd)

        return render_template('login.html', name = name, admin = admin)

def main():
    app.run(port=int(os.environ.get('PORT', 80)))

@app.route('/delete_user', methods=['POST'])
def delete_user():
    username = request.form.get('username')

    if username:
        delete_user_from_database(username)
    return redirect(url_for('adminpage'))

@app.route('/delete_site', methods=['POST'])
def delete_site():
    siteName = request.form.get('siteName')

    if siteName:
        delete_site_from_database(siteName)

    return redirect(url_for('allSites'))

if __name__ == "__main__":
    main()