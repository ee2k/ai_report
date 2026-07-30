# What Is RSA?

RSA (Rivest–Shamir–Adleman) is one of the first public-key cryptosystems and is widely used for secure data transmission. It is an **asymmetric** cryptographic algorithm, meaning it uses a pair of keys: a public key and a private key.

### The Core Idea: Public and Private Keys

The brilliance of RSA lies in its use of two mathematically linked keys.

-   The **Public Key** can be shared with anyone. It is used to encrypt data.
-   The **Private Key** must be kept secret by the recipient. It is the only key that can decrypt the data.

Think of it like a mailbox with a slot. Anyone can drop a letter into the slot (encrypt with the public key), but only the person with the key to the mailbox can open it and read the letters (decrypt with the private key).

### How Is It Secure?

The security of RSA relies on the "factoring problem"—the practical difficulty of finding the two original prime numbers used to create the public and private keys. While it is easy to multiply two large prime numbers to get the public modulus `n`, it is computationally infeasible to factor `n` back into its original prime components. This one-way nature is what protects the private key from being discovered.

While the concept is straightforward, the reason it works is based on some elegant principles of number theory. The rest of this document explores the mathematical proof that guarantees RSA's reliability.

# Why RSA Works: The Mathematical Proof

<div class="video-section"><a href="https://www.youtube.com/watch?v=wXB-V_Keiu8">Public Key Cryptography: RSA Encryption | Art of the Problem <span class="youtube-icon"></span></a>
<em>A recommended video if you prefer visual explanation</em>
</div>

The guarantee that RSA provides—that decrypting an encrypted message returns the original plaintext—is not magic. It is a certainty backed by a beautiful mathematical proof. This document walks through that proof, starting from the practical formula and showing why it always works.

### The Goal

Our goal is to prove that the full, practical RSA process perfectly reverses itself. We want to prove that for any message `M`:

`((M^e mod n)^d) mod n = M`

### The Components

Before diving into the proof, let's define the variables and the constraints they must satisfy:

-   **M**: The original, secret **Message** (plaintext). For RSA to work, the message must be represented as a number that is smaller than the modulus `n`. (`0 <= M < n`)
-   **C**: The encrypted **Ciphertext**.
-   **n**: The **modulus**. A large public number created by multiplying two secret prime numbers, `p` and `q`.
-   **phi (φ)**: **Euler's Totient of n**. Calculated as `(p-1) * (q-1)`, this value is kept secret and is essential for calculating the private exponent.
-   **e**: The **public exponent**. A public number used for encryption. It is not chosen randomly; it must satisfy two conditions:
    1.  It must be greater than 1 and less than `phi`. (`1 < e < phi`)
    2.  It must not share any common factors with `phi` (they must be "coprime"). This is crucial for ensuring a unique private key `d` exists.
-   **d**: The **private exponent**. A secret number calculated from `e` and `phi`. It is used for decryption.

### The Key Ingredients

To build the proof, we need to remember three facts from the RSA key generation process:

1.  **The Encryption Formula:** `C = M^e mod n`
2.  **The Decryption Formula:** `M = C^d mod n`
3.  **The Special Relationship:** The exponents `e` and `d` were specifically created so that `(e * d) mod phi = 1`. This means `e * d` is equal to 1 plus some multiple of `phi`. We can write this algebraically as:
    `e * d = 1 + k * phi` (where `k` is some whole number)

### The Tools of the Proof

Two key theorems from number theory make this proof possible.

#### Tool 1: The Law of Modular Exponentiation

This is a fundamental property of modular arithmetic. It states that for any numbers A, B, and C:

`(A^B) mod C = ((A mod C)^B) mod C`

This law is what allows us to connect the practical, two-step RSA calculation to the theoretical proof. It proves that applying the modulus operator at each step is mathematically sound.

<details>
  <summary>Click to see the proof for this law</summary>
  
  1. By the definition of modulus, we can say `A = q*C + (A mod C)`, where `q` is some integer quotient.
  2. Let's substitute this into the left side of the equation: `(q*C + (A mod C))^B mod C`.
  3. If we were to expand this expression using the binomial theorem, every single term, except for the very last one, would contain a factor of `q*C`.
  4. This means all those terms are multiples of `C`. When we take the whole expression `mod C`, all of those terms become 0.
  5. The only term that survives is the last one: `(A mod C)^B`.
  6. Therefore, the expression simplifies to `(A mod C)^B mod C`, which proves the property.
</details>

#### Tool 2: Euler's Totient Theorem

This is a cornerstone of number theory used in the RSA proof. It states that for any two numbers `M` and `n` that are coprime (share no common factors):

`M^phi mod n = 1`

This is the "magic" key that unlocks the final step of the proof.

<div class="video-section">
<em>Proof of Euler's Totient Theorem</em>
<a href="https://www.youtube.com/watch?v=5pswKNgVZSg">Euler's Totient Theorem and Fermat's Little Theorem | Mu Prime Math<span class="youtube-icon"></span></a>
<hr>
<em>Supplementary materials to the above proof</em>
<a href="what-is-rsa-totient-theorem-why-distinct">Why the Sets S and T' are Identical in Euler's Totient Theorem <span class="link-icon"></span></a>
<a href="https://www.youtube.com/watch?v=SslPWR2N5jA">Coprime Numbers and Reducing mod n | Mu Prime Math<span class="youtube-icon"></span></a>
<a href="https://www.youtube.com/watch?v=OkQJGql8os8">Fermat's Little Theorem | Michael Penn<span class="youtube-icon"></span></a>
</div>

### The Full Proof Step-by-Step

Let's start with the full expression for the RSA process and simplify it step-by-step.

1.  We start with the full expression:
    `((M^e mod n)^d) mod n`

2.  Using the **Law of Modular Exponentiation** (Tool 1), we can move the inner `mod n` to the outside. This is the crucial step that connects the practical formula to the simplified proof. Our expression is now equivalent to:
    `(M^e)^d mod n`

3.  Using a standard exponent rule, `(x^a)^b = x^(a*b)`, we can simplify this to:
    `M^(e*d) mod n`

4.  Now, let's use our **Special Relationship** from the key ingredients: `e * d = 1 + k * phi`. We substitute this into the exponent:
    `M^(1 + k*phi) mod n`

5.  We can use another exponent rule, `x^(a+b) = x^a * x^b`, to split the expression:
    `(M^1 * M^(k*phi)) mod n`

6.  Let's rearrange the second part using the first exponent rule again:
    `(M * (M^phi)^k) mod n`

7.  Here's the magic step! Look at the part in the parentheses: `M^phi`. According to **Euler's Totient Theorem** (Tool 2), `M^phi mod n` is just 1. So, we can substitute 1 into the formula:
    `(M * 1^k) mod n`

8.  And we know that 1 raised to any power `k` is still 1:
    `(M * 1) mod n`

9.  This leaves us with:
    `M mod n`

10. Since our original message `M` must, by definition, be smaller than `n`, the value of `M mod n` is simply `M`.

And there we have it! We have mathematically proven that the process perfectly reverses itself, leaving you with the original message.

`((M^e mod n)^d) mod n = M`

---
### Appendix: Why the Public Exponent (e) is Almost Always 65537

While the mathematical rules allow for many possible values for the public exponent `e`, in the real world, it is not chosen randomly. For performance and practical reasons, it's almost always set to a standard, fixed value: **65537**.

There are two main reasons for this:

1.  **It's Prime**: 65537 is a prime number. This makes it very likely to be coprime with `phi` (the chance of `phi` being a multiple of 65537 is astronomically small), which is a mandatory condition for `e`.

2.  **It's Fast**: This is the biggest reason. In binary, 65537 is `10000000000000001`. It consists of only two `1`s. When a computer calculates `(Message ^ e) mod n`, having very few `1`s in the binary representation of the exponent makes the calculation significantly faster.

Since encryption (using the public key `e`) is a very common operation, making it as fast as possible is a big advantage. So, instead of randomly generating `e` every time, systems just start with `e = 65537` and then generate the prime numbers `p` and `q` to fit it.