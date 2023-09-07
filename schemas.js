var parquet = require("parquetjs");

exports.WorkflowDefinition = () => {
  return new parquet.ParquetSchema({
    id: { type: "INT32" },
    organization_id: { type: "INT32" }
  });
};

exports.WorkflowStep = () => {
  return new parquet.ParquetSchema({
    id: { type: "INT32" },
    workflow_definition_id: { type: "INT32" }
  });
};

exports.WorkflowExecution = () => {
  return new parquet.ParquetSchema({
    id: { type: "INT32" },
    workflow_definition_id: { type: "INT32" },
    adddate: { type: "TIMESTAMP_MILLIS" },
    moddate: { type: "TIMESTAMP_MILLIS" },
    target_actor_account_id: { type: "INT32" }
  });
};

exports.WorkflowExecutionStep = () => {
  return new parquet.ParquetSchema({
    id: { type: "INT32" },
    workflow_execution_id: { type: "INT32" },
    workflow_activity_step_id: { type: "INT32" },
    adddate: { type: "TIMESTAMP_MILLIS" },
    moddate: { type: "TIMESTAMP_MILLIS" },
    complete: { type: "INT32" },
    terminated: { type: "INT32" },
    skipped: { type: "INT32" }
  });
};

exports.Conversation = () => {
  return new parquet.ParquetSchema({
    id: { type: "INT32" },
    workflow_activity_step_id: { type: "INT32" },
    creator_id: { type: "INT32" },
    aboutuser_id: { type: "INT32" },
    lastnoteseq: { type: "INT32" },
    adddate: { type: "TIMESTAMP_MILLIS" },
    lastnotedate: { type: "TIMESTAMP_MILLIS" }
  });
};

exports.Note = () => {
  return new parquet.ParquetSchema({
    id: { type: "INT32" },
    conversation_id: { type: "INT32" },
    adddate: { type: "TIMESTAMP_MILLIS" },
    noteseq: { type: "INT32" },
    noresponse: { type: "INT32" },
    original_buyer_id: { type: "INT32" }
  });
};

exports.Participant = () => {
  return new parquet.ParquetSchema({
    id: { type: "INT32" },
    note_id: { type: "INT32" },
    conversation_id: { type: "INT32" },
    participant_id: { type: "INT32" },
    noterole: { type: "UTF8"},
    readflag: { type: "INT32" },
    readdate: { type: "TIMESTAMP_MILLIS" }
  });
};

exports.Link = () => {
  return new parquet.ParquetSchema({
    id: { type: "INT32" },
    account_id: { type: "INT32" },
    with_account_id: { type: "INT32" },
    relationship: { type: "UTF8" },
    removed: { type: "INT32" }
  });
};
