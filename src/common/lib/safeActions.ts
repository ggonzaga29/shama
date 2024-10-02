import chalk from 'chalk';
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';
import { checkAuth } from 'src/modules/auth/actions';
import { z } from 'zod';

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error('Action error:', e.message);
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
      verboseLogging: z.boolean().optional(),
    });
  },
}).use(async ({ next, clientInput, metadata }) => {
  const getCurrentDateTime = () => {
    return new Date().toLocaleString();
  };

  console.log(chalk.cyan('\n📋 Starting Action Execution 📋'));

  const startTime = performance.now();

  try {
    const result = await next();

    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);

    console.log(chalk.green('\nAction Completed Successfully'));
    console.log(chalk.yellow('Duration:'), chalk.bold(`${duration} ms`));
    console.log(chalk.yellow('Timestamp:'), chalk.bold(getCurrentDateTime()));

    if (metadata.verboseLogging) {
      console.log(chalk.magenta('\nResult:'));
      console.dir(result, { depth: null, colors: true });

      if (clientInput instanceof FormData) {
        console.log(chalk.blue('\n🔹 Client Input: FormData'));
        for (const [key, value] of clientInput.entries()) {
          if (value instanceof File) {
            console.log(`${key}: ${value.name}`);
          } else {
            console.log(`${key}: ${value}`);
          }
        }
      } else {
        console.log(chalk.blue('\n🔹 Client Input:'));
        console.dir(JSON.stringify(clientInput), { depth: null, colors: true });
      }
    }

    console.log(chalk.red('\n🔸 Metadata:'));
    console.dir(metadata, { depth: null, colors: true });

    return result;
  } catch (error) {
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);

    console.log(chalk.red('\nAction Failed'));
    console.log(chalk.yellow('Duration:'), chalk.bold(`${duration} ms`));
    console.log(chalk.yellow('Timestamp:'), chalk.bold(getCurrentDateTime()));
    console.error(chalk.red('Error:'), error);

    throw error;
  }
});

export const authActionClient = actionClient.use(async ({ next }) => {
  try {
    const user = await checkAuth();
    return next({
      ctx: {
        user,
      },
    });
  } catch (e) {
    console.error('Session is invalid', e);
    throw new Error('Session is invalid');
  }
});
