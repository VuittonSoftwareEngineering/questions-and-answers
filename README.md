# E-commerce Back-end
This repository contains the back-end code for an e-commerce website. The main feature of this back-end is the Q&A component, which allows users to view and update product questions and answers, as well as report on the helpfulness of a question.

## Technologies Used
* Postgres: For handling large amounts of data and improving read speeds.
* Node.js: For building the back-end server.

## Schema Design
In order to transfer data directly to the database without any manipulation, a separate table for photos was created. However, this resulted in having to retrieve data from the photo table and the answer table and putting it together, which affected the speed of getting photos data. In the future, the schema will be improved by placing photos directly in the answers table for faster data retrieval.

## Performance Optimization
* Local testing using k6 resulted in a response time of around 35 seconds to retrieve answers related to a question. To improve this, tables were indexed and the response time was reduced to a little over a second.
* Deployment on an EC2 instance with AWS and testing with loader.io revealed a need for further performance optimization. A second server instance was created and an Nginx load balancer was used to improve the response time to 74 ms.
![2023-01-05 at 4 07 53 PM](https://user-images.githubusercontent.com/99362878/214119583-b93f4bd1-4902-41b2-8086-0575e422b4fe.png)
![Screen Shot 2023-01-07 at 10 52 56 AM](https://user-images.githubusercontent.com/99362878/214120584-12d5ed5c-d786-4bb2-a594-850f5674b605.png)







