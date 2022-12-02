import { Context, Logger, Probot } from 'probot';
import { createLogger } from '../../logger';

const handle = async (context: Context, logger: Logger): Promise<void> => {
  await context.octokit.issues.createComment(context.issue({ body: 'Hello, World!' }));
  logger.info('Pull request comment created');
};

const register = (app: Probot) => {
  app.on(
    ['pull_request.opened', 'pull_request.reopened', 'pull_request.edited', 'pull_request.synchronize'],
    async (context) => {
      const logger = createLogger(context, {
        issue_number: context.issue().issue_number,
      });

      handle(context, logger);
    }
  );
};

export default {
  register,
};
