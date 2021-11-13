/* global describe, it, beforeEach */

/** @typedef {import('./test-types').IdNode} IdNode */
/** @typedef {import('./test-types').IdNodeDeps} IdNodeDeps */

import chai from 'chai';
import { TreeModel } from '../src/index.js';

const { assert } = chai;

chai.config.includeStack = true;

describe('json support', function () {
  /** @type {TreeModel<{id: number}>} */
  let treeModel;

  beforeEach(function () {
    treeModel = new TreeModel();
  });

  it('works with JSON.stringify', function () {
    const root = treeModel.parse({ id: 1 });

    assert.equal(JSON.stringify(root), '{"id":1}');
  });

  it('JSON.stringify with children', function () {
    const root = treeModel.parse({
      id: 1,
      children: [
        {
          id: 11,
          children: [{ id: 111 }],
        },
        {
          id: 12,
          children: [{ id: 121 }, { id: 122 }],
        },
      ],
    });
    assert.equal(
      JSON.stringify(root, null, 2),
      [
        '{',
        '  "id": 1,',
        '  "children": [',
        '    {',
        '      "id": 11,',
        '      "children": [',
        '        {',
        '          "id": 111',
        '        }',
        '      ]',
        '    },',
        '    {',
        '      "id": 12,',
        '      "children": [',
        '        {',
        '          "id": 121',
        '        },',
        '        {',
        '          "id": 122',
        '        }',
        '      ]',
        '    }',
        '  ]',
        '}',
      ].join('\n')
    );
  });
});
