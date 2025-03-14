import { Selector } from 'testcafe';

// Utility function to create selectors using XPath
const XpathSelector = (xpath) => {
    return Selector(() => {
        const iterator = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
        const items = [];
        let item = iterator.iterateNext();
        while (item) {
            items.push(item);
            item = iterator.iterateNext();
        }
        return items;
    });
};
