FROM node:8
MAINTAINER Stefan Dejanovic <stefan.dejanovic@heig-vd.ch>

#
# When we build the image, we copy the executable jar in the image file system. 
#
COPY Musician.js /opt/app/

WORKDIR /opt/app/
RUN npm install
RUN npm install moment --save
RUN npm install uuid

CMD ["npm", "start"]
ENTRYPOINT ["node", "/opt/app/Musician.js" ]
