# base image
FROM python:3.7

# set the application directory
WORKDIR /app-python

# Install requirements.txt
ADD /python/requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

# add app
COPY /python/main.py ./
COPY /python ./

# listen on port
EXPOSE 5002

# start app
CMD python main.py
