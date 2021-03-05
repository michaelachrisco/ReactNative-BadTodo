import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
  version: 1, // Used for migrations
  tables: [
    tableSchema({
      name: 'tasks', // Convention is to be plural lowercase of the model
      columns: [
        { name: 'description', type: 'string' },
        { name: 'is_complete', type: 'boolean' },
        // These will be dates but we define it as numbers
        { name: 'created_at', type: 'number' }, 
        { name: 'updated_at', type: 'number' }
      ]
    }),
    tableSchema({
      name: 'subtasks',
      columns: [
        { name: 'description', type: 'string' },
        { name: 'is_complete', type: 'boolean' },
        // This is a foreign key but we define it as a string
        { name: 'task_id', type: 'string', isIndexed: true },
        // These will be dates but we define it as numbers
        { name: 'created_at', type: 'number'},
        { name: 'updated_at', type: 'number'}
      ]
    }),
  ]
})