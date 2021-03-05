import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Right, Body, Text, ListItem, CheckBox, Grid, Row, Form, Input, Item, Label } from 'native-base';

export default class BadTodo extends Component {
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
            There are { 0 } tasks
          </Text>
          <ListItem>
            <Grid>
              <Row>
                <CheckBox checked={false}/>
                <Body>
                  <Text>Need to do this</Text>
                </Body>
              </Row>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid>
              <Row>
                <CheckBox checked={false}/>
                <Body>
                  <Text>Need to do that</Text>
                </Body>
              </Row>
            </Grid>
          </ListItem>
          <Form>
            <Item floatingLabel>
              <Label>New Task Name</Label>
              <Input/>
            </Item>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Add Task</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}