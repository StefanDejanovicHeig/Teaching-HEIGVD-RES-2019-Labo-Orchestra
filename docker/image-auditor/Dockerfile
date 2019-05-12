FROM node:8
MAINTAINER Stefan Dejanovic <olivier.liechti@heig-vd.ch>

#
# When we build the image, we copy the executable jar in the image file system. 
#
COPY auditor.js /opt/app/

EXPOSE 2205

RUN npm install

CMD ["node", "/opt/app/auditor.js"]
