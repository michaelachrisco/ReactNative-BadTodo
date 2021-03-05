import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Right, Body, Text, ListItem, CheckBox, Grid, Row, Form, Input, Item, Label } from 'native-base';

export default class BadTodo extends Component {
  constructor(props) {
    super(props)
    
    // A better way to do this would be to use observables.
    // You can find out more about this in the watermelondb docs.
    this.updatePage()

    // We're just using the react basic state.
    // For a real app, it's recommended to use something like redux
    this.state = {
      taskCount: 0,
      tasks: [],
      newTaskDescription: ''
    }
  }

  // Refreshes the page
  async updatePage() {
    // Note this is the table name 'tasks' and not the model name 'Task'
    const tasksCollection = this.props.database.get('tasks')
    // query() without any parameters will get all the records in the table
    const taskCount = await tasksCollection.query().fetchCount()
    const tasks = await tasksCollection.query()
    console.log("Tasks count", taskCount)
    this.setState({taskCount: taskCount, tasks: tasks})
  }


  // Adds a new task from the newTaskDescription varaible in the component state
  async add() {
    const tasksCollection = this.props.database.get('tasks')
    if (this.state.newTaskDescription == '') {
      alert("Cannot add a blank task")
      return false;
    }
    await this.props.database.action(async () => {
      const newTask = await tasksCollection.create(task => {
        task.description = this.state.newTaskDescription;
        task.isComplete = false
      })
      console.log("Adding new task")
    })
    this.setState({newTaskDescription: ''})
    console.log("Added new task")
    this.updatePage()
  }

  // This should actually not delete the task, but instead set the
  // is_complete variable to true. But this is just a proof of concept.
  async setChecked(task) {
    console.log("Setting checked", task.id)
    await task.delete()
    this.updatePage()
  }

  // Renames a task. It's currently hardcoded to Renamed!
  async rename(task) {
    console.log("Renaming", task.id)
    await task.rename("Renamed!")
    this.updatePage()
  }

  // This is called when the text is changed.
  async onChangeText(text) {
    this.setState({newTaskDescription: text})
    console.log(text)
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Really Bad Todo</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Text>
            There are { this.state.taskCount } tasks
          </Text>
          {
            this.state.tasks.map((m, i) => {
              return (
                <ListItem key={m.id}>
                  <Grid>
                    <Row>
                      <CheckBox checked={m.isComplete} onPress={() => this.setChecked(m) }/>
                      <Body>
                        <Text onPress={() => this.rename(m) }>{m.description}</Text>
                      </Body>
                    </Row>
                  </Grid>
                </ListItem>
              )
            })
          }
          <Form>
            <Item floatingLabel>
              <Label>New Task Name</Label>
              <Input value={this.state.newTaskDescription} onChangeText={text => this.onChangeText(text)}/>
            </Item>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button full onPress={() => this.add()}>
              <Text>Add Task</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}