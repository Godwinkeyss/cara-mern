from flask import render_template, flash, redirect, url_for
from .forms import RegisterForm
from market import app, db, bcrypt
from .models import User


@app.route('/')
def home():
    return render_template('home.html', title="home page")




@app.route('/admin/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(first_name=form.firstName.data, last_name=form.lastName.data, email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash(f'Welcome {form.email.data}, you are now registered!', 'success')
        return redirect(url_for('home'))
    if form.errors != {}:
        for err_msg in form.errors.values():
            print(f'There was an error in creating a user: {err_msg}')
    return render_template('admin/register.html', form=form)


@app.route('/brand', methods=['GET', 'POST'])
def addBrand():
    return render_template('admin/addBrand.html', title='Add brand')