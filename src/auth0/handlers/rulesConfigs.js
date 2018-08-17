import DefaultHandler from './default';

export const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      key: { type: 'string', pattern: '^[A-Za-z0-9_-]*$' },
      value: { type: 'string' }
    }
  },
  additionalProperties: false
};

export default class RulesConfigsHandler extends DefaultHandler {
  constructor(options) {
    super({
      ...options,
      type: 'rulesConfigs',
      id: 'key',
      functions: {
        update: 'set' // Update or Creation of a ruleConfig is via set not update
      }
    });
  }

  async getType() {
    // Not required to return blank
    return [];
  }

  didDelete(config) {
    return super.didDelete(config.key);
  }

  didCreate(config) {
    return super.didCreate(config.key);
  }

  didUpdate(config) {
    return super.didUpdate(config.key);
  }

  async calcChanges(assets) {
    const { rulesConfigs } = assets;

    // Intention is to not delete/cleanup old configRules, that needs to be handled manually.
    return {
      del: [],
      update: rulesConfigs || [],
      create: []
    };
  }
}
