import http from 'k6/http';
import { check } from 'k6';

// export let options = {
//   stages: [
//     { duration: '10s', target: 10000 }
//   ],
// };

// export let options = {
//   vus: 50,
//   duration: '10s'
// };

export let options = {
  scenarios: {
      foo: {
          executor: 'constant-arrival-rate',
          // 100 iterations per second, i.e. exactly 100 RPS, since each
          // iteration has just a single request
          rate: 1000, timeUnit: '1s',
          // for how long do you want the scenario to run
          duration: '10s',
          // this number doesn't really matter, as long as it's high enough
          // that there is always a free VU to run an iteration on
          preAllocatedVUs: 1000,
      },
  },
};

export default function() {
  let res = http.get('http://localhost:3000/qa/questions/2/answers');
  check(res, {
    'status was 200': (r) => r.status == 200,
    'transaction time OK': (r) => r.timings.duration < 2000,
  });
}