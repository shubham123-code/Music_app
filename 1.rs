use std::collections::HashMap;
use std::io;
 
fn main() {
    let stdin = io::stdin();
    let mut input = String::new();
    stdin.read_line(&mut input).unwrap();
    for _ in 0..input.trim().parse().unwrap() {
        stdin.read_line(&mut input).unwrap();
        input.clear();
        stdin.read_line(&mut input).unwrap();
        let arr: Vec<i64> = input.trim().split(' ').map(|s| s.parse().unwrap()).collect();
        let mut i = 0;
        let mut score = 0;
        let mut current_sum = 0;
        while i < arr.len() && arr[i] != 0 {
            current_sum += arr[i];
            score += (current_sum == 0) as i64;
            i += 1;
        }
        while i < arr.len() {
            let mut counter = HashMap::new();
            counter.insert(current_sum, 1);
            i += 1;
            while i < arr.len() && arr[i] != 0 {
                current_sum += arr[i];
                counter.entry(current_sum).and_modify(|x| *x += 1).or_insert(1);
                i += 1;
            }
            let (delta, count) = counter.into_iter().max_by(|u, v| u.1.cmp(&v.1)).unwrap();
            current_sum -= delta;
            score += count;
        }
        println!("{}", score);
    }
}