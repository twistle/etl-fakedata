
const {faker} = require("@faker-js/faker");
const parquet = require("parquetjs");
const Schemas = require('./schemas');

(async function(){

const definitionsWriter = await parquet.ParquetWriter.openFile(Schemas.WorkflowDefinition(), 'WorkflowDefinitions.parquet');
const stepsWriter = await parquet.ParquetWriter.openFile(Schemas.WorkflowStep(), 'WorkflowSteps.parquet');
const executionsWriter = await parquet.ParquetWriter.openFile(Schemas.WorkflowExecution(), 'WorkflowExecutions.parquet');
const executionStepsWriter = await parquet.ParquetWriter.openFile(Schemas.WorkflowExecutionStep(), 'WorkflowExecutionSteps.parquet');
const conversationsWriter = await parquet.ParquetWriter.openFile(Schemas.Conversation(), 'Conversations.parquet');
const notesWriter = await parquet.ParquetWriter.openFile(Schemas.Note(), 'Notes.parquet');
const participantsWriter = await parquet.ParquetWriter.openFile(Schemas.Participant(), 'Participants.parquet');
const linksWriter = await parquet.ParquetWriter.openFile(Schemas.Link(), 'Links.parquet');
 

//create workflow definitions
for (let wd = 0; wd <= 1000; wd++) {
  let workflowDefinition = createWorkflowDefinition(wd);

  //create 30 workflowSteps for each definition
  for (let stepId = 0; stepId <= 20; stepId++) {
    let workflowStep = createWorkflowStep(stepId, workflowDefinition.id);

    //create 10000 for each workflow
    for (let executionId = 0; executionId <= 1000; executionId++) {
      let execution = createWorkflowExecution(
        executionId,
        workflowDefinition.id
      );

      //create 1000 execution steps for each execution?
      for ( let executionStepId = 0; executionStepId <= 100; executionStepId++) {
        let executionStep = createWorkflowExecutionStep(
          workflowDefinition.id,
          workflowStep.id
        );

        //create 100 conversations for each workflow execution
        for (let conversationId = 0; conversationId <= 100; conversationId++) {
          let conversation = createConversation(
            conversationId,
            executionStep.id
          );

          //create 50 notes per conversation
          for (let noteId = 0; noteId <= 10; noteId++) {
            let note = createNote(noteId, conversation.id);

            //create 5 participants per note
            for (let participantId = 0; participantId <= 5; participantId++) {
              let participant = createParticipant(
                participantId,
                note.id,
                conversation.id
              );

              await participantsWriter.appendRow(participant);
            }
            await notesWriter.appendRow(note);
          }

          await conversationsWriter.appendRow(conversation);
        }
        await executionStepsWriter.appendRow(executionStep);
      }

      await executionsWriter.appendRow(execution);
    }
    await stepsWriter.appendRow(workflowStep);
  }

  await definitionsWriter.appendRow(workflowDefinition);

  for (let linkId = 0; linkId <= 1000; linkId++) {
    let link = createLink(linkId);

    await linksWriter.appendRow(link);
  }
}
})();

// var writer = await parquet.ParquetWriter.openFile(schema, 'fruits.parquet');

// // append a few rows to the file
// await writer.appendRow({name: 'apples', quantity: 10, price: 2.5, date: new Date(), in_stock: true});
// await writer.appendRow({name: 'oranges', quantity: 10, price: 2.5, date: new Date(), in_stock: true});

function createWorkflowDefinition(id) {
  return {
    id,
    organization_id: faker.number.int({ max: 1000000 }),
  };
}

function createWorkflowStep(id, workflow_definition_id) {
  return {
    id,
    workflow_definition_id,
  };
}

function createWorkflowExecution(id, workflow_definition_id) {
  return {
    id,
    workflow_definition_id,
    adddate: Date.parse(faker.date.past()),
    moddate: Date.parse(faker.date.past()),
    target_actor_account_id: "",
  };
}

function createWorkflowExecutionStep( id, workflow_execution_id, workflow_activity_step_id) {
  return {
    id,
    workflow_execution_id,
    workflow_activity_step_id,
    adddate: Date.parse(faker.date.past()),
    moddate: Date.parse(faker.date.past()),
    complete: Math.round(Math.random()),
    terminated: Math.round(Math.random()),
    skipped: Math.round(Math.random()),
  };
}

function createConversation(id, workflow_activity_step_id) {
  return {
    id,
    workflow_activity_step_id,
    creator_id: faker.number.int({ max: 1000000 }),
    aboutuser_id: faker.number.int({ max: 1000000 }),
    lastnoteseq: faker.number.int({ max: 1000000 }),
    adddate: Date.parse(faker.date.past()),
    lastnotedate: Date.parse(faker.date.past()),
  };
}

function createNote(id, conversation_id) {
  return {
    id,
    conversation_id,
    addate: Date.parse(faker.date.past()),
    noteseq: faker.number.int({ max: 1000000 }),
    noresponse: Math.round(Math.random()),
    original_buyer_id: faker.number.int({ max: 1000000 }),
  };
}

function createParticipant(id, note_id, conversation_id) {
  return {
    id,
    note_id,
    conversation_id,
    participant_id: id,
    noterole: faker.string.alpha(10),
    readflag: Math.round(Math.random()),
    readdate: Date.parse(faker.date.past()),
  };
}

function createLink(id) {
  return {
    id,
    account_id: faker.number.int({ max: 1000000 }),
    with_account_id: faker.number.int({ max: 1000000 }),
    relationship: faker.string.alpha(10),
    removed: Math.round(Math.random()),
  };
}
