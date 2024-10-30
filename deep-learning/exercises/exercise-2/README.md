# Exercise 2

This is the second exercise for the course [Deep Learning](https://lehre.idh.uni-koeln.de/lehrveranstaltungen/wintersemester-2024-2025/deep-learning/).

Clone this repository to your local setup. Create a branch with the name of your GitHub account and switch to it.

In the repository, you find the file `calc.py` that runs a series of basic calculations based on user input:

```
Enter number 1: 
5
Enter number 2: 
7
Sum: 12
Product: 35
```

Extend this simple calculator by adding the following new features:

- In addition to being asked for two numbers, the user is now also asked for a math operation they want to do (either addition or multiplication). The program should then either add or multiply the numbers and then print the result. Write functions, one for addition and one for multiplication, to realize this.
- Instead of exiting the program after calculation, the program asks the user whether they want to continue. If the user enters some form of confirmation, the program starts over. If not, it exits.
- Extend your script so that the user gets first asked if they want to run the script in "interactive" or in "batch" mode. If the answer is "interactive", run the code as you've already written until now (it would be a good idea to wrap this functionality into a separate function). If the answer is "batch", execute a function written by you that reads in the contents of the file `calculations.txt` and calculates the formulas given in the file, line by line. Your program should run the appropriate addition or multiplication function, depending on if there is a "+" or "*" symbol in the line.

Commit your changes and push them to the branch with the name of your GitHub account.

Deadline for this exercise is October 24, 2024, 08:00:00 CEST.
