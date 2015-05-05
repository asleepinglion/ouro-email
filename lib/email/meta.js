module.exports = {

  class: "Email",
  extends: "Class",
  description: "An abstract email service for sending email via 3rd party providers.",

  methods: {

    send: {
      description: "Send email using the default or specified provider.",
      async: true
    }
  }

};
