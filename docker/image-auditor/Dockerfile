FROM node:8
MAINTAINER Stefan Dejanovic <stefan.dejanovic@heig-vd.ch>

#
# When we build the image, we copy the executable jar in the image file system. 
#
COPY auditor.js /opt/app/

EXPOSE 2205

RUN npm install
RUN npm install node-schedule

CMD ["node", "/opt/app/auditor.js"]
