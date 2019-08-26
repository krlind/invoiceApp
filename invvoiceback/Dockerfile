FROM node:12.7.0

WORKDIR /app

COPY ./ ./

RUN npm install 
RUN npm uninstall bcrypt
RUN npm install bcrypt 

CMD ["/bin/bash"]
