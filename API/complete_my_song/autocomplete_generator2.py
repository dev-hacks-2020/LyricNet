import tensorflow as tf
import numpy as np
import os
from API import genius

embedding_dim = 256
UNITS = 1024
seq_length = 80
BATCH_SIZE = 10
BUFFER_SIZE = 10000
EPOCHS = 50


def generate_main(singer, beginning, length_):
  """
  takes: singer (str) - the style of the song,
         beginning(str) - input song start,
          length_(int) - length of the song to be generated
  """
  with open("Available_datasets.txt") as f:
    available_singers = f.read().splitlines()
  singer_ = singer.lower()
  parts = singer_.split()
  search_name = ""
  for name_part in parts:
    search_name = search_name + '-' + name_part
  if search_name[1:] + '.txt' in available_singers:
    """
    DATASET IS ALREADY AVAILABLE -> USE pretrained weights
    """
    available = True
    with open("model/{0}".format(search_name[1:] + '.txt'+'.json')) as f:
        json_model = f.read()
    with open("weights/{0}".format(search_name[1:] + '.txt'+'.h5')) as f:
        pretrained_weights = f.read()
  else:
    available = False
    """
    call genius here
    """
    text = genius.get_songs(singer)


  def split_input_target(chunk):
      input_text = chunk[:-1]
      target_text = chunk[1:]
      return input_text, target_text

  def loss(labels, logits):
      return tf.keras.losses.sparse_categorical_crossentropy(labels, logits, from_logits=True)

  def model_(vocab_size, embedding_dim, rnn_units, batch_size):
      model = tf.keras.Sequential([
          tf.keras.layers.Embedding(vocab_size, embedding_dim,
                                    batch_input_shape=[batch_size, None]),
          tf.keras.layers.GRU(rnn_units,
                              return_sequences=True,
                              stateful=True,
                              recurrent_initializer='glorot_uniform'),
          tf.keras.layers.Dense(vocab_size)
      ])
      return model

  if available:
      """
      Load the pretrained model
      """
      model = tf.keras.models.model_from_json(json_model)
      model.load_weights(pretrained_weights)
  else:
      """
      Train on spot
      """
      vocab = sorted(set(text))
      vocab_size = len(vocab)
      charidx = {c:indx for indx,c in enumerate(vocab)}
      idxchar = np.array(vocab)
      text_as_int = np.array([charidx[c] for c in text])
      char_dataset = tf.data.Dataset.from_tensor_slices(text_as_int)
      sequences = char_dataset.batch(seq_length+1, drop_remainder=True)
      dataset = sequences.map(split_input_target)
      dataset = dataset.shuffle(BUFFER_SIZE).batch(BATCH_SIZE, drop_remainder=True)
      model = model_(
              vocab_size = len(vocab),
              embedding_dim = embedding_dim,
              rnn_units = UNITS,
              batch_size = BATCH_SIZE)
      model.compile(optimizer="adam", loss=loss)

      checkpoint_dir = '$./train_checkpoint'
      checkpoint_prefix = os.path.join(checkpoint_dir, "checkpoint_{epoch}")

      checkpoint_callback=tf.keras.callbacks.ModelCheckpoint(
          filepath=checkpoint_prefix,
          save_weights_only=True)

      model.fit(dataset, epochs=EPOCHS, callbacks=[checkpoint_callback])
      tf.train.latest_checkpoint(checkpoint_dir)
      model = model_(vocab_size, embedding_dim, UNITS, batch_size=1)
      model.load_weights(tf.train.latest_checkpoint(checkpoint_dir))

  model.build(tf.TensorShape([1, None]))
  input_eval = [charidx[start] for start in beginning]
  input_eval = tf.expand_dims(input_eval, 0)
  text = []
  temp = 1.0
  model.reset_states()

  for i in range(length_):
      predictions = model(input_eval)
      predictions = tf.squeeze(predictions, 0)
      predictions = predictions / temp
      predicted_id = tf.random.categorical(predictions, num_samples=1)[-1, 0].numpy()
      input_eval = tf.expand_dims([predicted_id], 0)a
      text.append(idxchar[predicted_id])

  return beginning + ''.join(text)


