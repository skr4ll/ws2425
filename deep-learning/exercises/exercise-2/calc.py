def calc():
    print("Enter number 1: ")
    num1 = int(input())
    print("Enter number 2: ")
    num2 = int(input())
    print("Enter operation [+/*]:  ")
    op = str(input())
    if op == '+':
        add(num1, num2)
    elif op == '*':
        multiply(num1, num2)
    else:
        print('no matching input')


def add(num1, num2):
    print("\tSum: " + str(num1 + num2))


def multiply(num1, num2):
    print("\tProduct: " + str(num1 * num2))


def calc_batch(file):
    f = open(file, "r")
    for line in f:
        expression = ""
        op = ""
        for char in str(line):
            if char == "+" or char == "*":
                op = char
            if char != " " and char != "\n":
                expression += char
        if op:
            num1 = int(expression.split(op)[0])
            num2 = int(expression.split(op)[1])
            print(f'Calculating {num1} {op} {num2}:')
            if op == "+":
                add(num1, num2)
            elif op == "*":
                multiply(num1, num2)
        else:
            print("Unknown operation, skipping...")


while True:
    print('Run program calc in interactive (i) or in batch (b) mode.')
    choice = str(input())
    if choice == 'i':
        print('running interactive mode')
        calc()
    elif choice == 'b':
        print('running batch mode')
        calc_batch("calculations.txt")
    else:
        print('no matching input')
    print('Another round? [n to quit/any key to go for another round]')
    choice = str(input())
    if choice == 'n':
        exit()
