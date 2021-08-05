{ 
    "title": "A list of example programms that use rekursion",  
    "image": "racket.jpg",
    "description": "Dies ist eyhin kurzer Text", 
    "date": "2021-02-20" 
}


This is just a collection with programms in racket that use rekursion. These solutions may not be perfect but maybe they can help somebody in need 😉.

### Sum up all elements of a list

```c++
(define prod
  (lambda [input]
    (cond
      [(empty? input) 1]
      [else (* (first input) (prod (rest input)))])))

(prod '(3 4 6))
```

### Multiplies all elements of a list
```c++
(define prod
  (lambda [input]
    (cond
      [(empty? input) 1]
      [else (* (first input) (prod (rest input)))])))
```

### Check if a list contains an item
```c++
(define enthaelt
  (lambda [input item]
    (cond
      [(empty? input) #false]
      [(equal? (first input) item) #true]
      [else (enthaelt (rest input) item)])))
```   

### Declines every element in a list by 1
```c++
(define declist
  (lambda [input]
    (cond
      [(empty? input) '()]
      [else (cons (- (first input) 1) (declist (rest input))) ])))
```

### Creates one falttend list from a list that may contains list
```c++
(define flatten
  (lambda [input]
    (cond
      [(empty? input) '()]
      [else (cond
              [(list? (first input)) (cons (first (first input)) (flatten (rest (first input))))]
              [else (cons (first input) (flatten (rest input)))])])))
```

### Creates a new list that contains list that contain the number of same elements in the list
```c++
(define frequencies
  (lambda [input]
    (cond
      [(list? (first input)) input]
      [else (frequencies (rest (checkExist input (first input))))])))

(define checkExist
  (lambda [input item]
    (cond
      [(empty? input) (list (list item 1))]
      [(list? (first input)) (cond
                               [(equal? item (first (first input))) (cons (list item (+ (first (rest (first input))) 1)) (rest input)) ]
                               [else (cons (first input) (checkExist (rest input) item))])]
      [else (cons (first input) (checkExist (rest input) item))])))
```

### Calculate the square number
```c++
(define f
  (lambda [n]
    (cond
      [(equal? n 1) 1]
      [else (+ (- (* 2 n) 1) (f (- n 1)))]))) 
```

### Check if a number is a prime number
```c++
(define checkPrime
  (lambda [n]
    (cond
      [(equal? n 0) #false]
      [(equal? n 1) #false]
      [(equal? n 2) #true]
      [else (checkPrimeHelper n (- n 1))])))
      

(define checkPrimeHelper
  (lambda [n helper]
    (cond
      [(equal? helper 1) #true]
      [else (cond
              [(equal? (modulo n helper) 0) #false]
              [else (checkPrimeHelper n (- helper 1))])
              ])))
```

### Calculate the faculty
```c++
(define fakut
 (lambda [n]
   (cond
     [(equal? n 0) 1]
     [else (* n (fakut (- n 1)))])))
```

### Calculating the reduction of a medizin that reduces by 40% after 24h. (Starting at 5mg)
```c++
(define medikament
  (lambda [n]
    (cond
      [(equal? n 0) 5]
      [else (* 5 (faktor n))])))

(define faktor
  (lambda [n]
    (cond
      [(equal? n 0) 1]
      [else (* 0.4 (faktor (- n 1)))])))
```

### Sum up the elements in a list and stop when a fixed number is reached
```c++
(define anzahl-bevor-summe
  (lambda [sum list]
    (cond
      [(empty? list) error]
      [else (cond
              [(<= (- sum (first list)) 0) 0]
              [else (+ 1 (anzahl-bevor-summe (- sum (first list)) (rest list))) ])]
      )))
```
