import { Model } from '@nozbe/watermelondb'
import { field, date, readonly, action } from '@nozbe/watermelondb/decorators'

// Naming convention is CamelCase singular
export default class Task extends Model {
  static table = 'tasks'
  static associations = {
    subtasks: { type: 'has_many', foreignKey: 'task_id' },
  }

  // These are our own fields
  @field('description') description
  @field('is_complete') isComplete

  // These are special fields that will automatically update when the
  // record is created and updated
  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt

  // Actions are functions that you can call on the database object
  // These can be something like calculating a new field, but in this
  // case we're using them to modify the database object directly.
  @action async addSubtask(description) {
    return this.collections.get('subtasks').create(subtask => {
      subtask.description = description
      subtask.isComplete = false
    })
  }
  
  @action async rename(newName) {
    await this.update(t => {
      t.description = newName
    })
  }

  @action async delete() {
    await this.markAsDeleted()
  }
}