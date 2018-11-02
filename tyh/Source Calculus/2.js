// Task 2
function make_oscillating_stream(n) {
    // Your answer here
      function h1(k){
          if(k > n){
              return h2(n-1);
          } else {
              return pair(k, () => h1(k+1));
          }
      }
      function h2(k){
          if(k < 2){
              return h1(1);
          } else {
              return pair(k, () => h2(k-1));
          }
      }
      return h1(1);
  }
  
  const osc_stream_123 = make_oscillating_stream(3);
  eval_stream(osc_stream_123, 10);