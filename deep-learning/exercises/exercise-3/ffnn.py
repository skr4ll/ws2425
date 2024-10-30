#!/usr/bin/env python3
# skr4ll Exercise 3
"""
Implementation of simple feed forward neural network
"""

import numpy as np


def ReLU(x):
    return np.maximum(0, x)


def sigmoid(x):
    return 1 / (1 + np.exp(-x))


def softmax(x):
    return np.exp(x) / np.exp(x).sum()


def FFNN(input_vec, mode):
    if mode == "binary":
        binary_classification(input_vec)
    elif mode == "multiclass":
        multiclass_classification(input_vec)
    else:
        print("mode not found")


def binary_classification(input_vector):
    """ HIDDEN LAYER 1 """
    weights_layer_1_h1 = np.array([0.5, 0.1, -0.8, 0.1])
    weights_layer_1_h2 = np.array([0.9, -0.1, 0.4, -0.4])
    bias_layer_1 = np.array([0.05, 0.01])

    layer_1_vector = np.array(
        [
            np.dot(input_vector, weights_layer_1_h1),
            np.dot(input_vector, weights_layer_1_h2)
        ]
    )
    layer_1_vector = ReLU(np.add(layer_1_vector, bias_layer_1))

    """ HIDDEN LAYER 2 """
    weights_layer_2_h1 = np.array([0.8, 0.2])
    weights_layer_2_h2 = np.array([-0.7, 0.3])
    bias_layer_2 = np.array([0.3, 0.3])

    layer_2_vector = np.array(
        [
            np.dot(layer_1_vector, weights_layer_2_h1),
            np.dot(layer_1_vector, weights_layer_2_h2)
        ]
    )

    layer_2_vector = ReLU(np.add(layer_2_vector, bias_layer_2))

    """ OUTPUT LAYER """
    weights_layer_output = np.array([0.9, -0.4])
    bias_layer_output = -0.01

    output_y = sigmoid(np.dot(layer_2_vector, weights_layer_output) + bias_layer_output)
    print(f'Output for binary: y = {output_y}')


def multiclass_classification(input_vector):
    """ HIDDEN LAYER 1 """
    weights_layer_1_h1 = np.array([0.5, 0.1, -0.8, 0.1])
    weights_layer_1_h2 = np.array([0.9, -0.1, 0.4, -0.4])
    bias_layer_1 = np.array([0.05, 0.01])

    layer_1_vector = np.array(
        [
            np.dot(input_vector, weights_layer_1_h1),
            np.dot(input_vector, weights_layer_1_h2)
        ]
    )
    layer_1_vector = ReLU(np.add(layer_1_vector, bias_layer_1))

    """ HIDDEN LAYER 2 """
    weights_layer_2_h1 = np.array([0.8, 0.2])
    weights_layer_2_h2 = np.array([-0.7, 0.3])
    bias_layer_2 = np.array([0.3, 0.3])

    layer_2_vector = np.array(
        [
            np.dot(layer_1_vector, weights_layer_2_h1),
            np.dot(layer_1_vector, weights_layer_2_h2)
        ]
    )

    layer_2_vector = ReLU(np.add(layer_2_vector, bias_layer_2))

    """ OUTPUT LAYER """
    weights_layer_output_y1 = np.array([0.9, -0.4])
    weights_layer_output_y2 = np.array([-0.3, 0.2])
    weights_layer_output_y3 = np.array([-0.3, 0.8])
    bias_layer_output = np.array([-0.01, 0.1, 0.05])

    layer_output_vector = np.array(
        [
            np.dot(layer_2_vector, weights_layer_output_y1),
            np.dot(layer_2_vector, weights_layer_output_y2),
            np.dot(layer_2_vector, weights_layer_output_y3)
        ]
    )

    layer_output_vector = softmax(np.add(layer_output_vector, bias_layer_output))
    print(f'Output for multiclass: y =  {layer_output_vector}')


""" Programmstart:"""
while True:
    selected_mode = input("mode? [binary/multiclass]:\t")
    string_input = input("\nvector? [must have exactly 4 numerical components, separated by a comma and without "
                         "whitespaces]\t")
    string_input_list = string_input.split(",")
    if len(string_input_list) == 4 and all(ele.replace('.', '', 1).isdigit() for ele in string_input_list):
        entered_input_vector = np.array(string_input_list, dtype=float)
        print(f'\nmode = {selected_mode} AND Vector = {entered_input_vector}')
        FFNN(entered_input_vector, selected_mode)
    else:
        print("Input is not a valid number or of invalid size.")
    choice = input("\nAnother round? [n to quit/any key for another round]:\t")
    if choice == "n":
        exit()
