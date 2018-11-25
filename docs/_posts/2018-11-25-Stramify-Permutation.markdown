---
layout: post
title:  "Stramify Permutation!"
date:   2018-11-25 15:34:20 +0800
categories: Source
---

Basically `function h(input)` is what you expect from `next_permutation` in the C++ STL...

<!--more-->

```js
function ins_sort(arr){
    function swap(a, b){
        const t = arr[a];
        arr[a] = arr[b];
        arr[b] = t;
    }
    const len = array_length(arr);
    for(let i = 0; i < len; i = i + 1){
        for(let j = i-1; j >= 0; j = j - 1){
            if(arr[j] <= arr[j+1]){
                break;
            } else {
                swap(j, j+1);
            }
        }
    }
    return arr;
}

function array_copy(arr){
    // this is not deep copy though... but sufficient for
    // the task at hand
    const res = [];
    for(let i = 0; i < array_length(arr); i = i + 1){
        res[i] = arr[i];
    }
    return res;
}

function h(input){
    const len = array_length(input);
    const arr = array_copy(input);
    function swap(a, b){
        const t = arr[a];
        arr[a] = arr[b];
        arr[b] = t;
    }
    function rev(a, b){
        for(let i = a; i <= math_floor((a+b)/2); i = i + 1){
            swap(i, a+b-i);
        }
    }
    let h = undefined;
    let l = undefined;
    for(let i = len-2; i >= 0; i = i - 1){
        if(arr[i]<arr[i+1]){
            h = i;
            break;
        } else {}
    }
    if(h !== undefined){
        for(let i = len-1; i > h; i = i - 1){
            if(arr[i] > arr[h]){
                l = i;
                break;
            } else {}
        }
        if(l !== undefined){
            swap(h,l);
            rev(h+1, len-1);
            return arr;
        } else {
            return undefined;
        }
    } else {
        return undefined;
    }
}

function gen_perm_stream(arr){
    ins_sort(arr);
    const a = pair(arr, () => stream_map(t=>h(t), a));
    return a;
}

const a = gen_perm_stream([3,1,2,4]);
eval_stream(a, 4);
```