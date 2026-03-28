# Proof: Why the Sets S and T' are Identical in Euler's Totient Theorem

The core of the proof for Euler's Totient Theorem lies in demonstrating that two sets, `S` and `T'`, are identical. This allows us to equate the product of their elements, which leads to the theorem's conclusion.

Here is the breakdown of the reasoning.

### 1. Defining the Sets

Let's start by defining the three sets used in the proof: `S`, `T`, and `T'`.

*   **S**: This is the set of all positive integers less than `n` that are relatively prime to `n`. The size of this set is `φ(n)` (by the definition of Euler's totient function).
    *   **Example**: If `n=10`, the numbers relatively prime to 10 are {1, 3, 7, 9}. So, `S = {1, 3, 7, 9}` and `φ(10) = 4`.

*   **T**: This set is formed by choosing an integer `a` that is also relatively prime to `n` (i.e., `gcd(a, n) = 1`) and multiplying every element in `S` by `a`.
    *   **Example**: Let `n=10` and `a=3` (since `gcd(3, 10) = 1`).
    *   `T = {1*3, 3*3, 7*3, 9*3} = {3, 9, 21, 27}`.

*   **T'**: This set is formed by taking each element of `T` and applying the modulo `n` operation.
    *   **Example**: With `n=10`, `T'` becomes:
    *   `T' = {3 mod 10, 9 mod 10, 21 mod 10, 27 mod 10} = {3, 9, 1, 7}`.

If you compare the results of the example, you'll notice that `S = {1, 3, 7, 9}` and `T' = {1, 3, 7, 9}`. They contain the exact same numbers, just in a different order. The proof formally demonstrates this is always true.

### 2. The Reasoning: Why S and T' Are the Same Set

To prove that `S` and `T'` are the same set, we need to show two things:

1.  Every element in `T'` is also a valid element for `S`.
2.  `T'` has the same number of elements as `S` (i.e., all its elements are distinct).

#### Part A: Is every element of T' also in S?

For a number to be in `S`, it must be less than `n` and relatively prime to `n`.

1.  **Less than n**: By definition, every element in `T'` is the result of a `mod n` operation, so they are all guaranteed to be less than `n`.
2.  **Relatively prime to n**: This is the crucial part. An element `t'` in `T'` is `(a * r) mod n` (where `r` is an element from `S`). This implies `t' ≡ a * r (mod n)`.
    *   We started with the conditions `gcd(a, n) = 1` and `gcd(r, n) = 1`.
    *   A fundamental property of number theory states that the product of two numbers relatively prime to `n` is also relatively prime to `n`. Therefore, `gcd(a * r, n) = 1`.
    *   Since `t'` is congruent to `a * r` modulo `n`, it shares the same greatest common divisor with `n`. Therefore, `gcd(t', n) = 1`.

This confirms that every number in `T'` is relatively prime to `n` and thus qualifies to be in `S`.

#### Part B: Are all elements of T' distinct?

The size of `S` is `φ(n)`. We need to show that `T'` also has `φ(n)` unique elements. We can prove this by contradiction.

*   **Assumption**: Assume two elements in `T'` are the same. Let's say `(a * r_i) mod n = (a * r_j) mod n`, where `r_i` and `r_j` are two *different* elements from `S`.
*   This congruence means `a * r_i` and `a * r_j` have the same remainder when divided by `n`.
*   Therefore, their difference must be a multiple of `n`: `a * r_i - a * r_j = k * n` for some integer `k`.
*   Factoring out `a` gives us: `a * (r_i - r_j) = k * n`.
*   Now, we use our initial condition that `a` is relatively prime to `n` (`gcd(a, n) = 1`). Since `n` divides the left side of the equation, `a * (r_i - r_j)`, and it shares no factors with `a`, it **must** divide the other factor, `(r_i - r_j)`.
*   But `r_i` and `r_j` are distinct members of `S`, meaning they are both positive integers less than `n`. Their difference, `(r_i - r_j)`, must be non-zero and smaller than `n`.
*   It is impossible for a non-zero integer smaller than `n` to be divisible by `n`. This is a **contradiction**.

Our initial assumption must be wrong. Therefore, all elements in `T'` must be distinct.

### Conclusion

We have established that:
1.  `T'` contains `φ(n)` distinct elements.
2.  Every element of `T'` is a number less than `n` and is relatively prime to `n`.

This is the exact definition of set `S`. Since both sets contain the same number of elements and all elements of `T'` meet the criteria for being in `S`, the two sets must be identical. Their elements may be in a different order, but the collections of numbers are the same.
