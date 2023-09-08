import { GraphQLError } from 'graphql';
import { User } from './models/User.js';
import { Todo } from './models/Todo.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const resolvers = {
  Query: {
    todos: async (parent, args, context) => {
      const { user } = context;
      if (!user) {
        throw unauthorizeError('You are not authorized');
      }

      const todos = await Todo.find({ userId: user._id });
      return todos;
    },
  },
  Mutation: {
    register: async (
      parent,
      { input: { email, password, name, age } },
      context,
    ) => {
      const hashedPassword = bcrypt.hashSync(password, 12);
      const user = new User({ email, password: hashedPassword, name, age });
      await user.save();
      return user;
    },
    login: async (parent, { input: { email, password } }, context) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw unauthorizeError('Invalid credentials');
      }
      console.log(user);
      console.log(password);

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        throw unauthorizeError('Invalid credentials');
      }
      const token = jwt.sign({ _id: user._id }, 'secret');
      return {
        token,
      };
    },
    createTodo: async (parent, { input: { title } }, context) => {
      const { user } = context;
      if (!user) {
        throw unauthorizeError('You are not authorized');
      }
      const todo = new Todo({
        title,
        userId: user._id,
      });
      await todo.save();
      return todo;
    },
  },

  Todo: {
    user: async (parent) => {
      const user = await User.findById(parent.userId);
      return user;
    },
  },
  User: {
    todos: async (parent) => {
      const todos = await Todo.find({ userId: parent._id });
      return todos;
    },
  },
};

function notfoundError(message) {
  return new GraphQLError(message, {
    extensions: {
      code: 'NOT_FOUND',
    },
  });
}

function badrequestError(message) {
  return new GraphQLError(message, {
    extensions: {
      code: 'BAD_REQUEST',
    },
  });
}

function unauthorizeError(message) {
  return new GraphQLError(message, {
    extensions: {
      code: 'UNAUTHORIZED',
    },
  });
}
