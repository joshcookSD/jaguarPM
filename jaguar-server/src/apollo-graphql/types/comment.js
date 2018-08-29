import User from "../../models/user";
import Task from "../../models/task";
import Group from "../../models/group";
import Project from "../../models/project";
import Team from "../../models/team";

const CommentType = `
    type Comment {
        _id: String
        comment: String
        user: User
        task: Task
        group: Group
        project: Project
        createdAt: Date
    }
`;

const CommentQuery = `
    allComment: [Comment]
    comment(_id: String): Comment
    taskComments(task: String): [Comment]
`;

const CommentMutation = `
    createTaskComment(
        comment: String
        user: String
        task: String
) : Comment
`;

const CommentQueryResolver = {
    allComment: async (parent, args, { Comment }) => {
        let comment = await Comment.find({});
        return comment.map(c => {
            c._id = c._id.toString();
            return c
        })
    },
    comment: async (parent, args, { Comment }) => {
        return await Comment.findById(args._id.toString())
    },
    taskComments: async (parent, args, { Comment }) => {
        const task = await Task.findById(args.task);
        return await Comment.find({ task })
    },
};

const CommentNested = {
    task: async ({ task }) => {
        return (await Task.findById( task ))
    },
    user: async ({ user }) => {
        return (await User.findById( user ))
    },
    group: async ({ group }) => {
        return (await Group.find( group ))
    },
    project: async ({ project }) => {
        return (await Project.find( project ))
    },
};

const CommentMutationResolver = {
    createTaskComment: async (parent, args, { Comment, Task, User }) => {
        let comment = await new Comment(args).save();
        let user = await User.findById(args.user);
        user.comments.push(comment._id);
        await user.save();
        let task = await Task.findById(args.task);
        task.comments.push(comment._id);
        await task.save();
        return comment
    }
};

export { CommentType, CommentQuery, CommentMutation, CommentQueryResolver, CommentNested, CommentMutationResolver };
